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
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ description, name });
    await this.repository.save(specification);
    return specification;
  }
}
