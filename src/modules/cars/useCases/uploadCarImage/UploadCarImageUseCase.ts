import { ICarImageRepository } from "@modules/cars/repositories/icarImageRepository";
import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}
@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarImageRepository")
    private carsRepository: ICarImageRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async (image) => {
      await this.carsRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}
