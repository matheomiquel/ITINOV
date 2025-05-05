import { UserDto } from "./user";

export type UserWithPasswordDto = UserDto & {
  password:string,
}
