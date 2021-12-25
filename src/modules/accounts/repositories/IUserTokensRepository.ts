import { ICreateUserTokensDto } from "../dtos/ICreateUserTokensDto";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUserTokensRepository {
  create(createUserTokenDto: ICreateUserTokensDto): Promise<UserTokens>;
}
