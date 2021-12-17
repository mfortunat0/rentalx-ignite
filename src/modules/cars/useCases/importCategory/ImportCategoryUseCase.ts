import fs from "fs";
import csvParse from "csv-parse";
import { ICategoryRepository } from "../../repositories/icategory.repository";
import { inject, injectable } from "tsyringe";
interface IImportCategory {
  name: string;
  description: string;
}
@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse.parse();
      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (error) => reject(error));
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const existsCategory = this.categoryRepository.findByName(name);
      if (!existsCategory) {
        this.categoryRepository.create({ name, description });
      }
    });
  }
}
