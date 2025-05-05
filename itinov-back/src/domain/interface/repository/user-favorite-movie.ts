import { UserFavoriteMovieDto } from "@src/domain/dto/user-favorite-movie/user-favorite-movie";

export interface IUserFavoriteMovieRepoSitory {
  create(
    { userId, movieId }:
      { userId: number, movieId: number }
  ): Promise<UserFavoriteMovieDto>;
  findByUserIdAndMovieId(userId: number, movieId: number): Promise<UserFavoriteMovieDto | null>;
  remove({ userId, movieId }:
    { userId: number, movieId: number }): Promise<void>;
}
