import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repository/iUser.repository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = sign({}, "3ca8751527f2602eded3c71eeef773cc", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      user: { name: user.name, email: user.email },
      token,
    };

    return tokenReturn;
  }
}
