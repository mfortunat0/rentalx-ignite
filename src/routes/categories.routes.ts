import { Request, Response, Router } from "express";
import { createcategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

categoriesRoutes.post("", (request: Request, response: Response) => {
  return createcategoryController.handle(request, response);
});

categoriesRoutes.get("", (request: Request, response: Response) => {
  return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };
