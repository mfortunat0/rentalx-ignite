import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "../icar.repository";

export class CarRepositoryInMemory implements ICarRepository {
  cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async create({
    category_id,
    brand,
    daily_rate,
    fine_amount,
    license_plate,
    description,
    name,
    id,
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
      id,
    });
    this.cars.push(car);
    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
    });
    return cars;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}
