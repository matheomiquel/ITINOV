import { DomainError } from "@src/domain/domain-error";
import { Token } from "@src/domain/dto/user/token";
import { TokenBody } from "@src/domain/dto/user/token-body";
import { UserDto } from "@src/domain/dto/user/user";
import { UserLoginDto } from "@src/domain/dto/user/user-login";
import { UserUpdatableField } from "@src/domain/dto/user/user-updatable-field";
import { UserWithPasswordDto } from "@src/domain/dto/user/user-with-password";
import { IUserDomain } from "@src/domain/interface/domain/user";
import { UserRepoSitory } from "@src/repository/service/user";
import {
  compare, hash
} from "bcrypt";
import { sign } from "jsonwebtoken";
export class UserDomain implements IUserDomain {
  private readonly userRepoSitory: UserRepoSitory;

  constructor({ userRepoSitory }: { userRepoSitory: UserRepoSitory }) {
    this.userRepoSitory = userRepoSitory;
  }

  public async register(userDto: UserWithPasswordDto): Promise<UserDto> {
    userDto.password = await hash(userDto.password, 10);
    const userDao = await this.userRepoSitory.register(userDto);
    const token = await UserDomain.createToken({ id: userDao.id, username: userDao.username });
    const user: UserDto = {
      ...userDao,
      token
    };

    return user;
  }

  public async login(userDto: UserLoginDto): Promise<Token & {username:string}> {
    const userDao = await this.userRepoSitory.login(userDto);

    if (!(userDao.password && await compare(userDto.password, userDao.password))) {
      throw DomainError.wrongPassword();
    }

    const token = await UserDomain.createToken({ id: userDao.id, username: userDao.username });

    return { token, username: userDao.username };
  }

  patch(userDto: UserUpdatableField, id: number): Promise<undefined> {
    return this.userRepoSitory.patch(userDto, id);
  }

  private static async createToken(
    { id, username }: TokenBody
  ): Promise<string> {
    return sign({ id, username }, String(process.env.PRIVATE_KEY));
  }
}
