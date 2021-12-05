import { Request, Response, Router } from "express";
import { Category } from "../model/Category";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("", (request: Request, response: Response) => {
  const { name, description } = request.body;
  const category: Category = new Category();
  Object.assign(category, {
    name,
    description,
    created_at: new Date(),
  });

  categories.push(category);

  return response.status(201).send();
});

export { categoriesRoutes };
