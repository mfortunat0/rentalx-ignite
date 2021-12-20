import { ICreateUserDto } from "../dtos/ICreateUserDto";
import { User } from "../infra/typeorm/entities/User";

export interface IUserRepository {
  create(createDto: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
