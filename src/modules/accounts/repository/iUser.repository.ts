import { ICreateUserDto } from "../dtos/ICreateUserDto";
import { User } from "../entities/User";

export interface IUserRepository {
  create(createDto: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
}
