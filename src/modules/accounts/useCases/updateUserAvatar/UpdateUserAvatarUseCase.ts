import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/iUser.repository";

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatarFile }: IRequest) {
    const user = await this.usersRepository.findById(user_id);

    if (user) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatarFile, "avatar");

    user.avatar = avatarFile;
    await this.usersRepository.create(user);
  }
}
