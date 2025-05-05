import { MovieDto } from "@src/domain/dto/movie/movie";
import { MovieDomain } from "@src/domain/implementation/movie";

import {
  RequestType,
  ResponseType
} from "../type/function-type";
import { HTTP_CODE } from "../type/http-code";

export class MovieController {
  private readonly movieDomain: MovieDomain;

  constructor({ movieDomain }: {
    movieDomain: MovieDomain
  }) {
    this.movieDomain = movieDomain;
  }

  async create(request: RequestType<MovieDto>): ResponseType<MovieDto> {
    const movie = await this.movieDomain.create(request.body);

    return { status: HTTP_CODE.CREATED, data: movie };
  }

  async find(request: RequestType<unknown>): ResponseType<MovieDto[]> {
    const userId = request.user!.id;
    const movies = await this.movieDomain.find(
      request.query.limit,
      request.query.offset,
      request.query.sort,
      userId
    );

    return { status: HTTP_CODE.OK, data: movies };
  }

  async grade(request: RequestType<any>): ResponseType<undefined> {
    const userId = request.user!.id;

    await this.movieDomain.grade(userId, request.params.id, request.body.grade);
    return { status: HTTP_CODE.NO_CONTENT, data: undefined };
  }

  async addToWatched(request: RequestType<any>): ResponseType<undefined> {
    const userId = request.user!.id;

    await this.movieDomain.addToWatched({ userId, movieId: request.params.id });
    return { status: HTTP_CODE.NO_CONTENT, data: undefined };
  }

  async addToFavorite(request: RequestType<any>): ResponseType<undefined> {
    const userId = request.user!.id;

    await this.movieDomain.addToFavorite({ userId, movieId: request.params.id });
    return { status: HTTP_CODE.NO_CONTENT, data: undefined };
  }
}
