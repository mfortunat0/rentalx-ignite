import { Category } from "../entities/Category";
import { ICreateCategoryDTO } from "./implementations/category.repository";

export interface ICategoryRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}
