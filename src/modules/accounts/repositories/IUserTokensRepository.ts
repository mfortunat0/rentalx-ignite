import { ICreateUserTokensDto } from "../dtos/ICreateUserTokensDto";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUserTokensRepository {
  create(createUserTokenDto: ICreateUserTokensDto): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}
