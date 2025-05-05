import { UserGradeMovieDto } from "@src/domain/dto/user-grade-movie/user-grade-movie";
import { IUserGradeMovieRepoSitory } from "@src/domain/interface/repository/user-grade-movie";

import { TUserGradeMovieModel } from "../dao/user-grade-movie";

export class UserGradeMovieRepoSitory implements IUserGradeMovieRepoSitory {
  private readonly userGradeMovieModel: TUserGradeMovieModel;

  constructor({ userGradeMovieModel }: { userGradeMovieModel: TUserGradeMovieModel }) {
    this.userGradeMovieModel = userGradeMovieModel;
  }

  async countByMovieId(movieId: number): Promise<number> {
    const countByMovieId = await this.userGradeMovieModel.count({ where: { movieId } });

    return countByMovieId;
  }

  async create(
    { userId, movieId, grade }:
      { userId: number, movieId: number, grade: number }
  ): Promise<UserGradeMovieDto> {
    const userGradeMovie = await this.userGradeMovieModel.create({
      userId,
      movieId,
      grade
    });

    return new UserGradeMovieDto(userGradeMovie.dataValues);
  }

  async update(userGradeMovie: UserGradeMovieDto): Promise<null> {
    this.userGradeMovieModel.update(
      { ...userGradeMovie },
      { where: { id: userGradeMovie.id } }
    );
    return null;
  }

  async findByUserIdAndMovieId(userId: number, movieId: number): Promise<UserGradeMovieDto | null> {
    const userGradeMovie = await this.userGradeMovieModel.findOne({
      where: {
        userId,
        movieId
      }
    });

    return userGradeMovie?.dataValues === undefined
      ? null
      : new UserGradeMovieDto(userGradeMovie.dataValues);
  }
}
