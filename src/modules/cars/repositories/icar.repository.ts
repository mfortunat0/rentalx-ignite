import { ICreateCarDto } from "../dtos/ICreateCarDto";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarRepository {
  create(createCarDto: ICreateCarDto): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
}
