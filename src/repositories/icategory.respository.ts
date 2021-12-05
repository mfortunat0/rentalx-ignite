import { Category } from "../model/Category";
import { ICreateCategoryDTO } from "./category.repository";

export interface ICategoryRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}
