import {
  idSchema
} from "@src/controller/schema";
import { paginationSchema } from "@src/controller/schema/common";
import { Validator } from "@src/controller/validator";
import {
  FastifyReply, FastifyRequest, HookHandlerDoneFunction
} from "fastify";
import {
  ZodError, ZodIssue
} from "zod";

export class CommonPreValidation {
  static id(request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction)
    : any | void {
    try {
      Validator.valideSchemaParams(request, idSchema);
      next();
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        const message = e.errors.map((error: ZodIssue) => error.message);

        return reply.code(400).send({ message });
      }
      return reply.code(500).send({ message: "erreur serveur" });
    }
  }

  static pagination(request: any, reply: FastifyReply, next: HookHandlerDoneFunction)
    : any | void {
    try {
      Validator.valideSchemaQuery(request, paginationSchema);
      request.query = {
        ...request.query,
        limit: Number(request.query.limit),
        offset: Number(request.query.offset)
      };
      next();
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        const message = e.errors.map((error: ZodIssue) => error.message);

        return reply.code(400).send({ message });
      }
      return reply.code(500).send({ message: "erreur serveur" });
    }
  }
}
