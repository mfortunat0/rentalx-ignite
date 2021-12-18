import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import multer from "multer";

const usersRoutes = Router();
const upload = multer({
  dest: "avatar",
});

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/",
  upload.single("file"),
  updateUserAvatarController.handle
);

export { usersRoutes };
