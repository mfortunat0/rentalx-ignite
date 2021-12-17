import multer from "multer";
import { Request, Response, Router } from "express";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";

const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp",
});
const createcategoryController = new CreateCategoryController();

categoriesRoutes.post("", createcategoryController.handle);

categoriesRoutes.get("", (request: Request, response: Response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  (request: Request, response: Response) => {
    return importCategoryController.handle(request, response);
  }
);

export { categoriesRoutes };
