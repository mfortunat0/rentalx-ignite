import { ICarRepository } from "@modules/cars/repositories/icar.repository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface IRequest {
  id: string;
  user_id: string;
}

export class DevolutionRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalsRepository: IRentalRepository,
    @inject("CarRepository")
    private carsRepository: ICarRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(id);

    const minimum_daily = 1;

    if (!rental) {
      throw new AppError("Rental does not exists");
    }
    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;
    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);
    return rental;
  }
}
