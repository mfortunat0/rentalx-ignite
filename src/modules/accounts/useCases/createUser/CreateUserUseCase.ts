import { inject, injectable } from "tsyringe";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { IUserRepository } from "../../repository/iUser.repository";
@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}
  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    await this.usersRepository.create({
      name,
      email,
      password,
      driver_license,
    });
  }
}
