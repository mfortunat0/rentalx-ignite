import { CategoryRepository } from "../../repositories/implementations/category.repository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoryRepository = new CategoryRepository();
const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
