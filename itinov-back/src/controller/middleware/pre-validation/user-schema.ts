import {
  loginSchema, registerSchema
} from "@src/controller/schema";
import { patchSchema } from "@src/controller/schema/user/patch-user";
import { Validator } from "@src/controller/validator";
import {
  FastifyReply, FastifyRequest, HookHandlerDoneFunction
} from "fastify";

import { HandleError } from "../handle-error";

export class UserPreValidation {
  static register(request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction)
    : any | void {
    try {
      Validator.valideSchemaBody(request, registerSchema);
      next();
    } catch (e: unknown) {
      return HandleError.handleZodError(e, reply);
    }
  }

  static login(request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction)
    : any | void {
    try {
      Validator.valideSchemaBody(request, loginSchema);
      next();
    } catch (e: unknown) {
      return HandleError.handleZodError(e, reply);
    }
  }

  static patch(request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction)
    : any | void {
    try {
      Validator.valideSchemaBody(request, patchSchema);
      next();
    } catch (e: unknown) {
      return HandleError.handleZodError(e, reply);
    }
  }
}
