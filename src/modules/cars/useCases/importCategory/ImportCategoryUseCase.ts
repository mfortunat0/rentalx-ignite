import fs from "fs";
import csvParse from "csv-parse";
import { ICategoryRepository } from "../../repositories/icategory.repository";

interface IImportCategory {
  name: string;
  description: string;
}
export class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

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
        .on("end", () => resolve(categories))
        .on("error", (error) => reject(error));
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);
  }
}
