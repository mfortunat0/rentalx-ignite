import { Category } from "../../model/Category";
import { ICategoryRepository } from "../../repositories/icategory.repository";

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}
