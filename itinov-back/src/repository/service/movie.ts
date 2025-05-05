import {
  MovieDto, MovieSort
} from "@src/domain/dto/movie/movie";
import { IMovieRepository } from "@src/domain/interface/repository";

import { TMovieModel } from "../dao/movie";
import { userFavoriteMovieModel } from "../dao/user-favorite-movie";
import { userGradeMovieModel } from "../dao/user-grade-movie";
import { userWatchedMovieModel } from "../dao/user-watched-movie";
import { RepositoryError } from "../repository-error";

export class MovieRepoSitory implements IMovieRepository {
  private readonly movieModel: TMovieModel;

  constructor({ movieModel }: { movieModel: TMovieModel }) {
    this.movieModel = movieModel;
  }

  async grade(movie: MovieDto): Promise<null> {
    this.movieModel.update(
      { grade: movie.grade, cumulGrade: movie.cumulGrade },
      { where: { id: movie.id } }
    );
    return null;
  }

  async find(limit: number, offset: number, sort: MovieSort, userId: number): Promise<MovieDto[]> {
    const movies = await this.movieModel.findAll({
      offset,
      limit,
      order: [[sort,
        "DESC"]],
      include: [{
        as: "movieWatched",
        model: userWatchedMovieModel,
        where: { userId },
        required: false
      },
      {
        as: "movieFavorite",
        model: userFavoriteMovieModel,
        where: { userId },
        required: false
      },
      {
        as: "movieGrade",
        model: userGradeMovieModel,
        where: { userId },
        required: false
      }]
    });

    return movies.map((m) => {
      const movie = m.get({ plain: true });
      const watched = movie.movieWatched.some(
        (movieWatched) => movieWatched.userId === userId
      );
      const favorite = movie.movieFavorite.some(
        (movieFavorite) => movieFavorite.userId === userId
      );
      const userGrade = movie.movieGrade.find(
        (movieGrade) => movieGrade.userId === userId
      )?.grade ?? null;

      return new MovieDto({
        ...movie, watched, favorite, userGrade
      });
    });
  }

  async findById(id: number): Promise<MovieDto | null> {
    const movie = await this.movieModel.findByPk(id);

    if (!movie) {
      return null;
    }
    return new MovieDto(movie.dataValues);
  }

  async create(movie: MovieDto): Promise<MovieDto> {
    const [movieCreated,
      created] = await this.movieModel.findOrCreate({
      where: { name: movie.name },
      defaults: movie
    });

    if (!created) {
      throw RepositoryError.createConflictError("Already existing movie");
    }
    return movieCreated.dataValues;
  }
}
