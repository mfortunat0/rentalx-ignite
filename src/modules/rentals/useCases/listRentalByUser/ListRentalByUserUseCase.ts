import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRentalByUserUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalsRepository: IRentalRepository
  ) {}
  async execute(user_id: string) {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);
    return rentalsByUser;
  }
}
