import { UserRepositotyInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mailProvider/in-memory/MailProviderInMemoty";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UserRepositotyInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositotyInMemory();
    dateProvider = new DayjsDateProvider();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "test",
      email: "test",
      name: "test",
      password: "test",
    });

    await sendForgotPasswordMailUseCase.execute("test");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a mail if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("test")).rejects.toEqual(
      new AppError("User does not exists")
    );
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = spyOn(userTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "test",
      email: "test",
      name: "test",
      password: "test",
    });

    await sendForgotPasswordMailUseCase.execute("test");

    expect(generateTokenMail).toBeCalled();
  });
});
