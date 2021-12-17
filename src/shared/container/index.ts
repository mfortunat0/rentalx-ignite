import { container } from "tsyringe";
import { ICategoryRepository } from "../../modules/cars/repositories/icategory.repository";
import { CategoryRepository } from "../../modules/cars/repositories/implementations/category.repository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
