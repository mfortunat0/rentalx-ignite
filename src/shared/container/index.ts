import { container } from "tsyringe";
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/User.repository";
import { IUserRepository } from "../../modules/accounts/repositories/iUser.repository";
import { ICategoryRepository } from "../../modules/cars/repositories/icategory.repository";
import { CategoryRepository } from "../../modules/cars/infra/typeorm/repositories/category.repository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/specification.repository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ispecification.repository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
