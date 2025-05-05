import { Token } from "@src/domain/dto/user/token";
import { UserDto } from "@src/domain/dto/user/user";
import { UserLoginDto } from "@src/domain/dto/user/user-login";
import { UserUpdatableField } from "@src/domain/dto/user/user-updatable-field";

export interface IUserDomain {
  register(userDto: UserDto): Promise<UserDto>;
  login(userDto: UserLoginDto): Promise<Token>;
  patch(userDto: UserUpdatableField, id: number): Promise<undefined>
}
