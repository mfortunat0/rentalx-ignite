import { ICreateCarDto } from "../dtos/ICreateCarDto";

export interface ICarRepository {
  create(createCarDto: ICreateCarDto): Promise<void>;
}
