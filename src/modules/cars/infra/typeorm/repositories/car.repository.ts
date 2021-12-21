import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { ICarRepository } from "@modules/cars/repositories/icar.repository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";
export class CarRepository implements ICarRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
  }
  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDto): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });
    return await this.repository.save(car);
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }
}
