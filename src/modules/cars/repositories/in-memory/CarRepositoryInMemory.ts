import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "../icar.repository";

export class CarRepositoryInMemory implements ICarRepository {
  cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async create({
    category_id,
    brand,
    daily_rate,
    fine_amount,
    license_plate,
    description,
    name,
  }: ICreateCarDto): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      description,
      name,
    });
    this.cars.push(car);
    return car;
  }
}
