import { UserWithPasswordDto } from "./user-with-password";

export type UserLoginDto = Pick<UserWithPasswordDto, "email" | "password">
