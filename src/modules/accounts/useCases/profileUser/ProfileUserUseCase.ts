import { UserMap } from "@modules/accounts/mapper/userMap";
import { IUserRepository } from "@modules/accounts/repositories/iUser.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}
  async execute(id: string) {
    const user = await this.usersRepository.findById(id);
    return UserMap.toDto(user);
  }
}
