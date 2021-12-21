import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../iUser.repository";

export class UserRepositotyInMemory implements IUserRepository {
  users: User[] = [];

  async create({
    driver_license,
    password,
    avatar,
    name,
    email,
  }: ICreateUserDto): Promise<void> {
    const user = new User();
    Object.assign(user, {
      driver_license,
      password,
      avatar,
      name,
      email,
    });
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}
