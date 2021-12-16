import { Category } from "../entities/Category";
import { ICreateCategoryDTO } from "./implementations/category.repository";

export interface ICategoryRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
