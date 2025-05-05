import { sequelize } from "@src/configuration/init-sequelize";
import { TABLE_NAME } from "@src/configuration/table-name";
import {
  DataTypes,
  ModelDefined
} from "sequelize";

import {
  baseModel, IBaseDao
} from "./base-model";

export interface UserFavoriteMovieDao extends IBaseDao {
  userId: number,
  movieId: number
}

const userFavoriteMovieModel: ModelDefined<UserFavoriteMovieDao, {}> = sequelize.define(
  TABLE_NAME.USER_WATCHED_MOVIE,
  {
    userId: {
      allowNull: false,
      type: new DataTypes.INTEGER(),
      references: {
        model: TABLE_NAME.USER,
        key: "id"
      }
    },
    movieId: {
      allowNull: false,
      type: new DataTypes.INTEGER(),
      references: {
        model: TABLE_NAME.MOVIE,
        key: "id"
      }
    },
    ...baseModel
  },
  {
    tableName: TABLE_NAME.USER_WATCHED_MOVIE,
    underscored: true,
    freezeTableName: true
  }
);

type TUserFavoriteMovieModel = typeof userFavoriteMovieModel;

export {
  TUserFavoriteMovieModel,
  userFavoriteMovieModel
};
