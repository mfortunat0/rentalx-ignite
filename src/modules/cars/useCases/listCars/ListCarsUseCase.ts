import { ICarRepository } from "@modules/cars/repositories/icar.repository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

export class ListCarsUseCase {
  constructor(private carsRepository: ICarRepository) {}

  async execute({ category_id, name, brand }: IRequest) {
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name
    );
    return cars;
  }
}
