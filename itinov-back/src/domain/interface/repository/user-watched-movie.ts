import { UserWatchedMovieDto } from "@src/domain/dto/user-watched-movie/user-watched-movie";

export interface IUserWatchedMovieRepoSitory {
  create(
    { userId, movieId }:
      { userId: number, movieId: number }
  ): Promise<UserWatchedMovieDto>;
  findByUserIdAndMovieId(userId: number, movieId: number): Promise<UserWatchedMovieDto | null>;
}
