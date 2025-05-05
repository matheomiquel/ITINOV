import { gradeSortchema } from "@src/controller/schema/movie/grade";
import { createMovieSchema } from "@src/controller/schema/movie/movie";
import { movieSortchema } from "@src/controller/schema/movie/movie-sort";
import { Validator } from "@src/controller/validator";
import {
  FastifyReply, FastifyRequest, HookHandlerDoneFunction
} from "fastify";

import { HandleError } from "../handle-error";

export class MoviePreValidation {
  static create(request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction)
    : any | void {
    try {
      Validator.valideSchemaBody(request, createMovieSchema);
      next();
    } catch (e: unknown) {
      return HandleError.handleZodError(e, reply);
    }
  }

  static sort(request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction)
    : any | void {
    try {
      Validator.valideSchemaQuery(request, movieSortchema);
      next();
    } catch (e: unknown) {
      return HandleError.handleZodError(e, reply);
    }
  }

  static grade(request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction)
    : any | void {
    try {
      Validator.valideSchemaBody(request, gradeSortchema);
      next();
    } catch (e: unknown) {
      return HandleError.handleZodError(e, reply);
    }
  }
}
