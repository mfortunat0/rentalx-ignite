import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalByUserUseCase } from "./ListRentalByUserUseCase";

export class ListRentalByUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const listRentalByUserUseCase = container.resolve(ListRentalByUserUseCase);
    const rental = await listRentalByUserUseCase.execute(id);
    response.json(rental);
  }
}
