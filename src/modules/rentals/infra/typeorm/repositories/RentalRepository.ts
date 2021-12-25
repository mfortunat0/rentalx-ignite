import { ICreateRentalDto } from "@modules/rentals/dtos/ICreateRentalDto";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

export class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ car_id });
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ user_id });
    return rental;
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDto): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
    });
    await this.repository.save(rental);
    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);
    return rental;
  }
}
