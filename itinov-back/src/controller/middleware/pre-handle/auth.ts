import { RequestType } from "@src/controller/type/function-type";
import { TokenBody } from "@src/domain/dto/user/token-body";
import {
  FastifyReply, HookHandlerDoneFunction
} from "fastify";
import {
  JsonWebTokenError, verify
} from "jsonwebtoken";

export class AuthValidation {
  static auth(request: RequestType<any>, reply: FastifyReply, next: HookHandlerDoneFunction) {
    try {
      const authorization = request.headers.authorization;

      if (!authorization) {
        return reply.code(401).send({ message: "unauthorized" });
      }

      const token = authorization.split(" ")[1];

      request.user = verify(token, String(process.env.PRIVATE_KEY)) as TokenBody;
      next();
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return reply.code(401).send({ message: "unauthorized" });
      }
      return reply.code(500).send({ message: "erreur serveur" });
    }
  }
}
