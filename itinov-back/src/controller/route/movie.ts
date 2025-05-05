import { IController } from "@controller/interface";
import { HTTPMethods } from "@controller/type/http-method";

import { AuthValidation } from "../middleware/pre-handle/auth";
import { CommonPreValidation } from "../middleware/pre-validation/common";
import { MoviePreValidation } from "../middleware/pre-validation/movie-schema";
import { MovieController } from "../service";
import { TCreateRoute } from "./create-route";
import { ENDPOINT } from "./endpoint";

export class MovieRoute implements IController {
  private readonly createRoute: TCreateRoute;

  private readonly movieController: MovieController;

  constructor(
    { createRoute, movieController }:
      { createRoute: TCreateRoute, movieController: MovieController }
  ) {
    this.createRoute = createRoute;
    this.movieController = movieController;
  }

  init() {
    this.createRoute.createHttpRoute({
      method: HTTPMethods.POST,
      path: ENDPOINT.MOVIE,
      preValidation: [MoviePreValidation.create],
      preHandler: [AuthValidation.auth],
      context: this.movieController,
      handler: this.movieController.create
    });

    this.createRoute.createHttpRoute({
      method: HTTPMethods.GET,
      path: ENDPOINT.MOVIE,
      preValidation: [CommonPreValidation.pagination,
        MoviePreValidation.sort],
      preHandler: [AuthValidation.auth],
      context: this.movieController,
      handler: this.movieController.find
    });

    this.createRoute.createHttpRoute({
      method: HTTPMethods.PATCH,
      path: ENDPOINT.MOVIE_BY_ID,
      preValidation: [CommonPreValidation.id,
        MoviePreValidation.grade],
      preHandler: [AuthValidation.auth],
      context: this.movieController,
      handler: this.movieController.grade
    });

    this.createRoute.createHttpRoute({
      method: HTTPMethods.PATCH,
      path: ENDPOINT.ADD_MOVIE_TO_WATCHED,
      preValidation: [CommonPreValidation.id],
      preHandler: [AuthValidation.auth],
      context: this.movieController,
      handler: this.movieController.addToWatched
    });
  }
}
