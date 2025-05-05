import { FastifyRequest } from "fastify";
import {
  ZodSchema
} from "zod";

export class Validator {
  static valideSchemaBody(request: FastifyRequest, schema: ZodSchema): Promise<unknown> {
    return schema.parse(request.body);
  }

  static valideSchemaParams(request: FastifyRequest, schema: ZodSchema): Promise<unknown> {
    return schema.parse(request.params);
  }

  static valideSchemaQuery(request: FastifyRequest, schema: ZodSchema): Promise<unknown> {
    return schema.parse(request.query);
  }
}
