import { CreateRoute } from "@controller/route/create-route";
import { UserRoute } from "@controller/route/user";
import {
  MovieController,
  UserController
} from "@controller/service";
import { UserDomain } from "@domain/implementation/user";
import cors from "@fastify/cors";
import {
  userModel
} from "@repository/dao";
import { UserRepoSitory } from "@repository/service/user";
import { config } from "dotenv";
import Fastify, {
  FastifyReply, FastifyRequest
} from "fastify";

import { MovieRoute } from "./controller/route/movie";
import { HTTP_CODE } from "./controller/type/http-code";
import { MovieDomain } from "./domain/implementation/movie";
import { movieModel } from "./repository/dao/movie";
import { userFavoriteMovieModel } from "./repository/dao/user-favorite-movie";
import { userGradeMovieModel } from "./repository/dao/user-grade-movie";
import { userWatchedMovieModel } from "./repository/dao/user-watched-movie";
import { MovieRepoSitory } from "./repository/service/movie";
import { UserFavoriteMovieRepoSitory } from "./repository/service/user-favorite-movie";
import { UserGradeMovieRepoSitory } from "./repository/service/user-grade-movie";
import { UserWatchedMovieRepoSitory } from "./repository/service/user-watched-movie";

const app = Fastify({ logger: true });

app.register(cors, {});
let path = ".env";

if (process.env.APP_ENV) {
  path = `${path}.${process.env.APP_ENV.trim()}`;
}
config({ path: path });
const PORT = Number(process.env.PORT) ?? 3000;

const createRoute = new CreateRoute({ app });

/// //////////////////REPOSITORY //////////////////////////////////////
const userRepoSitory = new UserRepoSitory({ userModel });
const movieRepoSitory = new MovieRepoSitory({ movieModel });
const userGradeMovieRepository = new UserGradeMovieRepoSitory({ userGradeMovieModel });
const userFavoriteMovieRepoSitory = new UserFavoriteMovieRepoSitory({ userFavoriteMovieModel });
const userWatchedMovieRepoSitory = new UserWatchedMovieRepoSitory({ userWatchedMovieModel });

/// //////////////////DOMAIN //////////////////////////////////////
const userDomain = new UserDomain({ userRepoSitory });
const movieDomain = new MovieDomain({
  movieRepoSitory,
  userGradeMovieRepository,
  userFavoriteMovieRepoSitory,
  userWatchedMovieRepoSitory
});

/// //////////////////CONTROLLER //////////////////////////////////////
const userController = new UserController({ userDomain });
const movieController = new MovieController({ movieDomain });

/// //////////////////ROUTE //////////////////////////////////////
const userRoute = new UserRoute({ createRoute, userController });
const movieRoute = new MovieRoute({ createRoute, movieController });

/// //////////////////INIT ROUTE //////////////////////////////////////

userRoute.init();
movieRoute.init();

app.get("/health", (_request: FastifyRequest, reply: FastifyReply) => {
  return reply.code(HTTP_CODE.NO_CONTENT).send();
});

// app.all("*", (_request: FastifyRequest, reply: FastifyReply) => {
//   return reply.code(HTTP_CODE.NOT_FOUND).send({ message: "Route not found" });
// });
app.listen({ port: PORT }, () => {
  // eslint-disable-next-line no-console
  console.log(`server start on port: ${PORT}`);
});
