import multer from "multer";
import { Request, Response, Router } from "express";
import { createcategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("", (request: Request, response: Response) => {
  return createcategoryController.handle(request, response);
});

categoriesRoutes.get("", (request: Request, response: Response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  (request: Request, response: Response) => {
    const { file } = request;
  }
);

export { categoriesRoutes };
