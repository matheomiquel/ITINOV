import { Token } from "@domain/dto/user/token";
import { UserDto } from "@domain/dto/user/user";
import { UserLoginDto } from "@domain/dto/user/user-login";
import { UserWithPasswordDto } from "@domain/dto/user/user-with-password";
import { UserDomain } from "@domain/implementation/user";

import {
  RequestType, ResponseType
} from "../type/function-type";
import { HTTP_CODE } from "../type/http-code";

export class UserController {
  private readonly userDomain: UserDomain;

  constructor({ userDomain }: {
    userDomain: UserDomain
  }) {
    this.userDomain = userDomain;
  }

  async register(request: RequestType<UserWithPasswordDto>): ResponseType<UserDto> {
    const user = await this.userDomain.register(request.body);

    return { status: HTTP_CODE.CREATED, data: user };
  }

  async login(request: RequestType<UserLoginDto>): ResponseType<Token> {
    const user = await this.userDomain.login(request.body);

    return { status: HTTP_CODE.CREATED, data: user };
  }
}
