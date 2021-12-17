import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
export class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    try {
      await createCategoryUseCase.execute({ name, description });
    } catch (error) {
      return response.status(400).json({ error });
    }
    return response.status(201).send();
  }
}
