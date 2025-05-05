import { sequelize } from "@src/configuration/init-sequelize";
import { TABLE_NAME } from "@src/configuration/table-name";
import {
  DataTypes,
  ModelDefined
} from "sequelize";

import {
  baseModel, IBaseDao
} from "./base-model";
import {
  UserFavoriteMovieDao, userFavoriteMovieModel
} from "./user-favorite-movie";
import {
  UserGradeMovieDao, userGradeMovieModel
} from "./user-grade-movie";
import {
  UserWatchedMovieDao, userWatchedMovieModel
} from "./user-watched-movie";

export interface MovieDao extends IBaseDao {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  releaseDate: Date;
  grade: number;
  cumulGrade: number;
  movieWatched: UserWatchedMovieDao[];
  movieFavorite : UserFavoriteMovieDao[];
  movieGrade: UserGradeMovieDao[];
}

const movieModel: ModelDefined<MovieDao, {}> = sequelize.define(
  TABLE_NAME.MOVIE,
  {
    name: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    releaseDate: {
      type: new DataTypes.DATE(),
      allowNull: false
    },
    grade: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 0
    },
    cumulGrade: {
      type: new DataTypes.INTEGER(),
      defaultValue: 0,
      allowNull: false
    },
    ...baseModel
  },
  {
    tableName: TABLE_NAME.MOVIE,
    underscored: true,
    freezeTableName: true
  }
);

type TMovieModel = typeof movieModel;

movieModel.hasMany(userWatchedMovieModel, {
  foreignKey: "movie_id",
  sourceKey: "id",
  as: "movieWatched"
});

movieModel.hasMany(userFavoriteMovieModel, {
  foreignKey: "movie_id",
  sourceKey: "id",
  as: "movieFavorite"
});

movieModel.hasMany(userGradeMovieModel, {
  foreignKey: "movie_id",
  sourceKey: "id",
  as: "movieGrade"
});

export {
  movieModel, TMovieModel
};
