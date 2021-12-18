import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    const { id: user_id } = request.user;
    const avatarFile = request.file.filename;
    await updateUserAvatarUseCase.execute({ user_id, avatarFile });

    response.status(204).send();
  }
}
