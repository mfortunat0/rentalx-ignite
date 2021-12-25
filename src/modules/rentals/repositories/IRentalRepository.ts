import { ICreateRentalDto } from "../dtos/ICreateRentalDto";
import { Rental } from "../infra/typeorm/entities/Rental";

export interface IRentalRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(createRentalDto: ICreateRentalDto): Promise<Rental>;
  findById(id: string): Promise<Rental>;
}
