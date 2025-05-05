import {
  MovieDto, MovieSort
} from "@src/domain/dto/movie/movie";

export interface IMovieRepository {
  create(movie: MovieDto): Promise<MovieDto>;
  find(limit: number, offset: number, movieSort: MovieSort, userId:number): Promise<MovieDto[]>;
  grade(movie: MovieDto): Promise<null>;
  findById(id: number): Promise<MovieDto | null>;
}
