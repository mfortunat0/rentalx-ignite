import { CategoryRepository } from "../../repositories/implementations/category.repository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default () => {
  const categoriesRepository = new CategoryRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  const createcategoryController = new CreateCategoryController(
    createCategoryUseCase
  );
  return createcategoryController;
};
