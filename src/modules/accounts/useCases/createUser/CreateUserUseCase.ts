import { inject } from "tsyringe";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { IUserRepository } from "../../repository/iUser.repository";

export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}
  async execute({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    await this.usersRepository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });
  }
}
