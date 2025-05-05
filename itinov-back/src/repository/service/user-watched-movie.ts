import { UserWatchedMovieDto } from "@src/domain/dto/user-watched-movie/user-watched-movie";
import { IUserWatchedMovieRepoSitory } from "@src/domain/interface/repository/user-watched-movie";

import { TUserWatchedMovieModel } from "../dao/user-watched-movie";

export class UserWatchedMovieRepoSitory implements IUserWatchedMovieRepoSitory {
  private readonly userWatchedMovieModel: TUserWatchedMovieModel;

  constructor({ userWatchedMovieModel }: { userWatchedMovieModel: TUserWatchedMovieModel }) {
    this.userWatchedMovieModel = userWatchedMovieModel;
  }

  async create(
    { userId, movieId }:
      { userId: number, movieId: number }
  ): Promise<UserWatchedMovieDto> {
    const userWatchedMovie = await this.userWatchedMovieModel.create({
      userId,
      movieId
    });

    return new UserWatchedMovieDto(userWatchedMovie.dataValues);
  }

  async findByUserIdAndMovieId(userId: number, movieId: number):
    Promise<UserWatchedMovieDto | null> {
    const userWatchedMovie = await this.userWatchedMovieModel.findOne({
      where: {
        userId,
        movieId
      }
    });

    return userWatchedMovie?.dataValues === undefined
      ? null
      : new UserWatchedMovieDto(userWatchedMovie.dataValues);
  }
}
