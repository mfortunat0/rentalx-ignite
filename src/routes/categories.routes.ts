import { Request, Response, Router } from "express";
import { CategoryRepository } from "../modules/cars/repositories/category.repository";
import { createcategoryController } from "../modules/cars/useCases/createCategory";

const categoriesRoutes = Router();
const categoriesRepository = new CategoryRepository();

categoriesRoutes.post("", (request: Request, response: Response) => {
  return createcategoryController.handle(request, response);
});

categoriesRoutes.get("", (request: Request, response: Response) => {
  const all = categoriesRepository.list();
  return response.json(all);
});

export { categoriesRoutes };
