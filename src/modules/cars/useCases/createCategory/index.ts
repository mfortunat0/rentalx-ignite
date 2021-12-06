import { CategoryRepository } from "../../repositories/implementations/category.repository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepository = CategoryRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createcategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export { createcategoryController };
