import { ICarRepository } from "@modules/cars/repositories/icar.repository";
import { ISpecificationRepository } from "@modules/cars/repositories/ispecification.repository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  specification_id: string[];
}
@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarRepository")
    private carsRepository: ICarRepository,
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}
  async execute({ car_id, specification_id }: IRequest) {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car doesnt exists");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specification_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}
