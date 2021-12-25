import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { UserRepositotyInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositotyInMemory;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositotyInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDto = {
      driver_license: "12i9as090",
      email: "test@gmail.com",
      name: "test",
      password: "123",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "teste",
        password: "teste",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDto = {
      driver_license: "12i9as090",
      email: "test@gmail.com",
      name: "test",
      password: "123",
    };

    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
