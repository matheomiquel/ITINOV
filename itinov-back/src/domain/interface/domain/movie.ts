import {
  MovieDto, MovieSort
} from "@src/domain/dto/movie/movie";

export interface IMovieDomain {
  create(movie: MovieDto): Promise<MovieDto>;
  find(limit: number, offset: number, sort: MovieSort, userId:number): Promise<MovieDto[]>;
  grade(userId: number, movieId: number, grade: number): Promise<null>;
  addToFavorite({ userId, movieId }: { userId: number, movieId: number }): Promise<null>;
  removeFromFavorite({ userId, movieId }: { userId: number, movieId: number }): Promise<void>;
  addToWatched({ userId, movieId }: { userId: number, movieId: number }): Promise<null>;
}
