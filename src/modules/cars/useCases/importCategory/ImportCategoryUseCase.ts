import fs from "fs";
export class ImportCategoryUseCase {
  execute(file: Express.Multer.File) {
    const stream = fs.createReadStream(file.path);
    stream.pipe()
  }
}
