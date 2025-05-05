import { MovieRepoSitory } from "@src/repository/service/movie";
import {
  UserFavoriteMovieRepoSitory
} from "@src/repository/service/user-favorite-movie";
import { UserGradeMovieRepoSitory } from "@src/repository/service/user-grade-movie";
import { UserWatchedMovieRepoSitory } from "@src/repository/service/user-watched-movie";

import { DomainError } from "../domain-error";
import {
  MovieDto, MovieSort
} from "../dto/movie/movie";
import { UserGradeMovieDto } from "../dto/user-grade-movie/user-grade-movie";
import { IMovieDomain } from "../interface/domain";
export class MovieDomain implements IMovieDomain {
  private readonly movieRepoSitory: MovieRepoSitory;

  private readonly userGradeMovieRepository: UserGradeMovieRepoSitory;

  private readonly userWatchedMovieRepoSitory: UserWatchedMovieRepoSitory;

  private readonly userFavoriteMovieRepoSitory: UserFavoriteMovieRepoSitory;

  constructor(
    { movieRepoSitory,
      userGradeMovieRepository,
      userWatchedMovieRepoSitory,
      userFavoriteMovieRepoSitory }:
      {
        movieRepoSitory: MovieRepoSitory,
        userGradeMovieRepository: UserGradeMovieRepoSitory,
        userWatchedMovieRepoSitory: UserWatchedMovieRepoSitory,
        userFavoriteMovieRepoSitory: UserFavoriteMovieRepoSitory
      }
  ) {
    this.movieRepoSitory = movieRepoSitory;
    this.userGradeMovieRepository = userGradeMovieRepository;
    this.userWatchedMovieRepoSitory = userWatchedMovieRepoSitory;
    this.userFavoriteMovieRepoSitory = userFavoriteMovieRepoSitory;
  }

  async find(limit: number, offset: number, sort: MovieSort, userId:number): Promise<MovieDto[]> {
    return this.movieRepoSitory.find(limit, offset, sort, userId);
  }

  async create(movie: MovieDto): Promise<MovieDto> {
    return this.movieRepoSitory.create(movie);
  }

  async addToFavorite({ userId, movieId }: { userId: number, movieId: number }): Promise<null> {
    await this.getMovie(movieId);
    await this.userFavoriteMovieRepoSitory.create({ userId, movieId });
    return null;
  }

  async removeFromFavorite({ userId, movieId }:
    { userId: number; movieId: number; }): Promise<void> {
    await this.getMovie(movieId);
    await this.userFavoriteMovieRepoSitory.remove({ userId, movieId });
  }

  async addToWatched({ userId, movieId }: { userId: number, movieId: number }): Promise<null> {
    await this.getMovie(movieId);
    await this.userWatchedMovieRepoSitory.create({ userId, movieId });
    return null;
  }

  async grade(userId: number, movieId: number, grade: number): Promise<null> {
    const movie = await this.getMovie(movieId);

    const [countByMovieId,
      userGradeMovie] = await Promise.all([
      this.userGradeMovieRepository.countByMovieId(movieId),
      this.userGradeMovieRepository
        .findByUserIdAndMovieId(userId, movieId)
    ]);

    if (userGradeMovie) {
      this.updateGrade({
        userGradeMovie, grade, movie, countByMovieId
      });
    } else {
      this.createGrade({
        userId, movieId, grade, movie, countByMovieId
      });
    }
    return null;
  }

  private async createGrade({ userId, movieId, grade, movie, countByMovieId }:
    { userId: number, movieId: number, grade: number, movie: MovieDto, countByMovieId: number }) {
    movie.cumulGrade += grade;
    movie.grade = movie.cumulGrade / (countByMovieId + 1);
    await Promise.all([
      this.userGradeMovieRepository.create({
        userId, movieId, grade
      }),
      this.movieRepoSitory.grade(movie)
    ]);
  }

  private async updateGrade({ userGradeMovie, grade, movie, countByMovieId }:
    { userGradeMovie: UserGradeMovieDto, grade: number, movie: MovieDto, countByMovieId: number }) {
    movie.cumulGrade = movie.cumulGrade - userGradeMovie.grade + grade;
    movie.grade = movie.cumulGrade / countByMovieId;
    userGradeMovie.grade = grade;

    await Promise.all([
      this.userGradeMovieRepository.update(userGradeMovie),
      this.movieRepoSitory.grade(movie)
    ]);
  }

  private async getMovie(movieId: number): Promise<MovieDto> {
    const movie = await this.movieRepoSitory.findById(movieId);

    if (!movie) {
      throw DomainError.movieNotFound();
    }
    return movie;
  }
}
