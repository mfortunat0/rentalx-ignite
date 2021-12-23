import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
  async handle(request: Request, response: Response) {
    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const { id: user_id } = request.user;
    const { car_id, expected_return_date } = request.body;

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id,
    });

    return response.status(201).json(rental);
  }
}
