import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repository/iUser.repository";

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}
  async execute({ user_id, avatarFile }: IRequest) {
    const user = await this.usersRepository.findById(user_id);
    user.avatar = avatarFile;
    await this.usersRepository.create(user);
  }
}
