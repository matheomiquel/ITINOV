import { UserDto } from "@src/domain/dto/user/user";
import { UserLoginDto } from "@src/domain/dto/user/user-login";
import { UserUpdatableField } from "@src/domain/dto/user/user-updatable-field";
import { UserDao } from "@src/repository/dao/user";

export interface IUserRepository {
  register(userDto: UserDto): Promise<UserDao>
  login(userDto: UserLoginDto): Promise<UserDao>
  patch(userDto: UserUpdatableField, id:number): Promise<undefined>
}
