import { CategoryRepository } from "../../repositories/implementations/category.repository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoryRepository = new CategoryRepository();
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
