import { getRepository, Repository } from "typeorm";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User";
import { IUserRepository } from "../iUser.repository";

export class UserRepository implements IUserRepository {
  private respository: Repository<User>;
  constructor() {
    this.respository = getRepository(User);
  }
  async create(createDto: ICreateUserDto): Promise<void> {
    const { name, username, email, password, driver_license } = createDto;
    const user = this.respository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });
    await this.respository.save(user);
  }
}
