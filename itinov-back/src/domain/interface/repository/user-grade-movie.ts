import { UserGradeMovieDto } from "@src/domain/dto/user-grade-movie/user-grade-movie";

export interface IUserGradeMovieRepoSitory {
  create(
    { userId, movieId, grade }:
      { userId: number, movieId: number, grade: number }
  ): Promise<UserGradeMovieDto>;
  update(userGradeMovieDto: UserGradeMovieDto): Promise<null>;
  findByUserIdAndMovieId(userId: number, movieId: number): Promise<UserGradeMovieDto | null>;
  countByMovieId(movieId: number): Promise<Number>;
}
