import { sequelize } from "@src/configuration/init-sequelize";
import { TABLE_NAME } from "@src/configuration/table-name";
import {
  DataTypes,
  ModelDefined
} from "sequelize";

import {
  baseModel, IBaseDao
} from "./base-model";

export interface UserGradeMovieDao extends IBaseDao {
  userId: number,
  movieId: number,
  grade: number
}

const userGradeMovieModel: ModelDefined<UserGradeMovieDao, {}> = sequelize.define(
  TABLE_NAME.USER_GRADE_MOVIE,
  {
    grade: {
      allowNull: false,
      type: new DataTypes.INTEGER()
    },
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
    tableName: TABLE_NAME.USER_GRADE_MOVIE,
    underscored: true,
    freezeTableName: true
  }
);

type TUserGradeMovieModel = typeof userGradeMovieModel;

export {
  TUserGradeMovieModel,
  userGradeMovieModel
};
