import { ICarRepository } from "@modules/cars/repositories/icar.repository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications: string[];
}

export class CreateCarSpecificationUseCase {
  constructor(private carsRepository: ICarRepository) {}
  async execute({ car_id, specifications }: IRequest) {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car doesnt exists");
    }
  }
}
