import { Category } from "../infra/typeorm/entities/Category";
import { ICreateCategoryDTO } from "../infra/typeorm/repositories/category.repository";

export interface ICategoryRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
