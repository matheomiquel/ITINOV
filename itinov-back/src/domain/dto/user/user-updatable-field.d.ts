import { UserDto } from "./user";

export type UserUpdatableField = Omit<UserDto, "email" | "token"| "id">;
