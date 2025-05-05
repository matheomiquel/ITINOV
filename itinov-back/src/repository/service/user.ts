import { UserDto } from "@src/domain/dto/user/user";
import { UserLoginDto } from "@src/domain/dto/user/user-login";
import { UserUpdatableField } from "@src/domain/dto/user/user-updatable-field";
import { IUserRepository } from "@src/domain/interface";

import {
  TUserModel,
  UserDao
} from "../dao/user";
import { RepositoryError } from "../repository-error";

export class UserRepoSitory implements IUserRepository {
  private readonly userModel: TUserModel;

  constructor({ userModel }: { userModel: TUserModel }) {
    this.userModel = userModel;
  }

  async register(userDto: UserDto): Promise<UserDao> {
    const [user,
      created] = await this.userModel.findOrCreate({
      where: { email: userDto.email },
      defaults: userDto
    });

    if (!created) {
      throw RepositoryError.createConflictError("Already existing email");
    }
    return user.dataValues;
  }

  async login(userDto: UserLoginDto): Promise<UserDao> {
    const user = await this.userModel.findOne({ where: { email: userDto.email } });

    if (!user?.dataValues) {
      throw RepositoryError.createNotFoundError("User not found");
    }
    return user.dataValues;
  }

  async patch(userDto: UserUpdatableField, id: number): Promise<undefined> {
    const [rowUpdated] = await this.userModel.update(
      { ...userDto },
      { where: { id } }
    );

    if (rowUpdated === 0) {
      throw RepositoryError.createNotFoundError("User not found");
    }
  }
}
