import config from "../../sequelize/config/config.json";
import {
  DatabaseOption, EnvironmentName
} from "./env";

const environment = process.env.APP_ENV?.trim() as EnvironmentName ?? "development";

const configuration = config[environment] as DatabaseOption;

export {
  configuration, environment
};
