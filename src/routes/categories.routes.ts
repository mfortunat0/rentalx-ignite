import { Request, Response, Router } from "express";
import { CategoryRepository } from "../repositories/category.repository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoryRepository();

categoriesRoutes.post("", (request: Request, response: Response) => {
  const { name, description } = request.body;
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  try {
    createCategoryService.execute({ name, description });
  } catch (error) {
    return response.status(400).json({ error });
  }
  return response.status(201).send();
});

categoriesRoutes.get("", (request: Request, response: Response) => {
  const all = categoriesRepository.list();
  return response.json(all);
});

export { categoriesRoutes };
