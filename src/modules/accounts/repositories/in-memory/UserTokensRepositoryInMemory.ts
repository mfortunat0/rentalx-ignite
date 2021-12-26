import { ICreateUserTokensDto } from "@modules/accounts/dtos/ICreateUserTokensDto";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUserTokensRepository } from "../IUserTokensRepository";

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  userTokens: UserTokens[] = [];

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find((userToken) => userToken.id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
    return userToken;
  }

  async create({
    refresh_token,
    expires_date,
    user_id,
  }: ICreateUserTokensDto): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      refresh_token,
      expires_date,
      user_id,
    });

    this.userTokens.push(userToken);
    return userToken;
  }
}
