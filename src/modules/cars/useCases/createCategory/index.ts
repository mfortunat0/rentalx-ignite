import { CategoryRepository } from "../../repositories/category.repository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepository = new CategoryRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createcategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export { createcategoryController };
