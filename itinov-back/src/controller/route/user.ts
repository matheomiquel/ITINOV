import { IController } from "@controller/interface";
import { UserPreValidation } from "@controller/middleware/pre-validation/user-schema";
import { UserController } from "@controller/service";
import { HTTPMethods } from "@controller/type/http-method";

import { TCreateRoute } from "./create-route";
import { ENDPOINT } from "./endpoint";

export class UserRoute implements IController {
  private readonly createRoute: TCreateRoute;

  private readonly userController: UserController;

  constructor(
    { createRoute, userController }:
      { createRoute: TCreateRoute, userController: UserController }
  ) {
    this.createRoute = createRoute;
    this.userController = userController;
  }

  init() {
    this.createRoute.createHttpRoute({
      method: HTTPMethods.POST,
      path: ENDPOINT.REGISTER,
      preHandler: [],
      preValidation: [UserPreValidation.register],
      context: this.userController,
      handler: this.userController.register
    });
    this.createRoute.createHttpRoute({
      method: HTTPMethods.POST,
      path: ENDPOINT.LOGIN,
      preValidation: [UserPreValidation.login],
      context: this.userController,
      handler: this.userController.login
    });
  }
}
