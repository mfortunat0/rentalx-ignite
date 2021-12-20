import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoryRepository } from "../../repositories/icategory.repository";
import { inject, injectable } from "tsyringe";
@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
