import fs from "fs";
import csvParse from "csv-parse";
export class ImportCategoryUseCase {
  execute(file: Express.Multer.File) {
    const stream = fs.createReadStream(file.path);
    const parseFile = csvParse();
    stream.pipe(parseFile);
  }
}
