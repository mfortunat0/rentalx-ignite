import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../../../repositories/ispecification.repository";
import { Specification } from "../entities/Specification";
import { getRepository, Repository } from "typeorm";

export class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ description, name });
    await this.repository.save(specification);
  }
}
