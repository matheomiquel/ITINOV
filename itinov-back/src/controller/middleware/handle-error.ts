import { FastifyReply } from "fastify";
import {
  ZodError, ZodIssue
} from "zod";

export class HandleError {
  static handleZodError(error: unknown, reply: FastifyReply) {
    if (error instanceof ZodError) {
      const message = error.errors.map((zodError: ZodIssue) => zodError.message);

      return reply.code(400).send({ message });
    }
    return reply.code(500).send({ message: "erreur serveur" });
  }
}
