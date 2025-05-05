export class UserGradeMovieDto {
  public id: number;

  public userId: number;

  public movieId: number;

  public grade: number;

  constructor(
    { id, userId, movieId, grade }:
      { id: number, userId: number, movieId: number, grade:number }
  ) {
    this.id = id;
    this.userId = userId;
    this.movieId = movieId;
    this.grade = grade;
  }
}
