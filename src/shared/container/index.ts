import { container } from "tsyringe";
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/User.repository";
import { IUserRepository } from "../../modules/accounts/repositories/iUser.repository";
import { ICategoryRepository } from "../../modules/cars/repositories/icategory.repository";
import { CategoryRepository } from "../../modules/cars/infra/typeorm/repositories/category.repository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/specification.repository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ispecification.repository";
import { ICarRepository } from "@modules/cars/repositories/icar.repository";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/car.repository";
import { ICarImageRepository } from "@modules/cars/repositories/icarImageRepository";
import { CarImageRepository } from "@modules/cars/infra/typeorm/repositories/carImage.repository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalRepository";
import "@shared/container/providers";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);
container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
container.registerSingleton<IRentalRepository>(
  "RentalRepository",
  RentalRepository
);

container.registerSingleton<ICarImageRepository>(
  "CarImageRepository",
  CarImageRepository
);
