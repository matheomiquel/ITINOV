import { ObjectType } from "@src/controller/type/function-type";
import { Options } from "sequelize";

type EnvironmentName = "development" | "test" | "production"

export type DatabaseOption = Options & {
  database: string,
  host: string,
  port: number,
  username: string,
  password: string,
  dialectOptions: ObjectType
};

export type env = {
  [key in EnvironmentName]: DatabaseOption
}
