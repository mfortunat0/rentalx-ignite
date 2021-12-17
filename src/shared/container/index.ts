import { container } from "tsyringe";
import { ICategoryRepository } from "../../modules/cars/repositories/icategory.repository";
import { CategoryRepository } from "../../modules/cars/repositories/implementations/category.repository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/specification.repository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ispecification.repository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);
