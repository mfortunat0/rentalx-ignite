import { inject, injectable } from "tsyringe";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { IUserRepository } from "../../repositories/iUser.repository";
import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/AppError";
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
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}
