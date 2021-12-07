import { Request, Response } from "express";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoriesUseCase) {}
  handle(request: Request, response: Response): Response {
    const all = this.listCategoryUseCase.execute();
    return response.json(all);
  }
}
