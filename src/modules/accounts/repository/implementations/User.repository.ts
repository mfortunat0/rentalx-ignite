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
    const { name, email, password, driver_license, avatar, id } = createDto;
    const user = this.respository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });
    await this.respository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.respository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.respository.findOne(id);
    return user;
  }
}
