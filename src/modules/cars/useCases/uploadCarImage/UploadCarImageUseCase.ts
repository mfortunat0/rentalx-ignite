import { ICarImageRepository } from "@modules/cars/repositories/icarImageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}
@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarImageRepository")
    private carsRepository: ICarImageRepository
  ) {}
  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async (image) => {
      await this.carsRepository.create(car_id, image);
    });
  }
}
