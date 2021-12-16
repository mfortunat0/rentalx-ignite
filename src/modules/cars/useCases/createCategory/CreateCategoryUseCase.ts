import { ICategoryRepository } from "../../repositories/icategory.repository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    this.categoriesRepository.create({ name, description });
  }
}
