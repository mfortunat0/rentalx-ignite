import { ICreateUserDto } from "../dtos/ICreateUserDto";

export interface IUserRepository {
  create(createDto: ICreateUserDto): Promise<void>;
}
