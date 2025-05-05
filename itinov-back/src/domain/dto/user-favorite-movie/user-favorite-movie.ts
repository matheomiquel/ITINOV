export class UserFavoriteMovieDto {
  public id: number;

  public userId: number;

  public movieId: number;

  constructor(
    { id, userId, movieId }:
      { id: number, userId: number, movieId: number}
  ) {
    this.id = id;
    this.userId = userId;
    this.movieId = movieId;
  }
}
