import { UserFavoriteMovieDto } from "@src/domain/dto/user-favorite-movie/user-favorite-movie";
import { IUserFavoriteMovieRepoSitory } from "@src/domain/interface/repository/user-favorite-movie";

import { TUserFavoriteMovieModel } from "../dao/user-favorite-movie";

export class UserFavoriteMovieRepoSitory implements IUserFavoriteMovieRepoSitory {
  private readonly userFavoriteMovieModel: TUserFavoriteMovieModel;

  constructor({ userFavoriteMovieModel }: { userFavoriteMovieModel: TUserFavoriteMovieModel }) {
    this.userFavoriteMovieModel = userFavoriteMovieModel;
  }

  async create(
    { userId, movieId }:
      { userId: number, movieId: number }
  ): Promise<UserFavoriteMovieDto> {
    const userGradeMovie = await this.userFavoriteMovieModel.create({
      userId,
      movieId
    });

    return new UserFavoriteMovieDto(userGradeMovie.dataValues);
  }

  async remove({ userId, movieId }:
    { userId: number, movieId: number }): Promise<void> {
    await this.userFavoriteMovieModel.destroy({
      where: {
        movieId,
        userId: userId
      }
    });
  }

  async findByUserIdAndMovieId(userId: number, movieId: number):
    Promise<UserFavoriteMovieDto | null> {
    const userGradeMovie = await this.userFavoriteMovieModel.findOne({
      where: {
        userId,
        movieId
      }
    });

    return userGradeMovie?.dataValues === undefined
      ? null
      : new UserFavoriteMovieDto(userGradeMovie.dataValues);
  }
}
