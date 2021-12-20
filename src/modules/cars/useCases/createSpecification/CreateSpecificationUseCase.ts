import { ISpecificationRepository } from "../../repositories/ispecification.repository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists");
    }

    this.specificationRepository.create({ name, description });
  }
}
