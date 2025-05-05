import { sequelize } from "@src/configuration/init-sequelize";
import { TABLE_NAME } from "@src/configuration/table-name";
import {
  DataTypes,
  ModelDefined
} from "sequelize";

import {
  baseModel, IBaseDao
} from "./base-model";

export interface UserDao extends IBaseDao {
  username: string,
  email: string,
  password?: string
}

const userModel: ModelDefined<UserDao, {}> = sequelize.define(
  "user",
  {
    username: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(),
      allowNull: false,
      unique: true
    },
    password: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    ...baseModel
  },
  {
    tableName: TABLE_NAME.USER,
    underscored: true,
    freezeTableName: true,
    hooks: {
      afterCreate: (record) => {
        delete record.dataValues.password;
      },
      afterUpdate: (record) => {
        delete record.dataValues.password;
      }
    }
  }
);

type TUserModel = typeof userModel;

export {
  TUserModel, userModel
};
