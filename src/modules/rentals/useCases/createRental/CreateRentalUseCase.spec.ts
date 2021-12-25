import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  let createRentalUseCase: CreateRentalUseCase;
  let rentalsRepositoryInMemoty: RentalRepositoryInMemory;
  let dayjsDateProvider: DayjsDateProvider;
  let carRepositoryInMemory: CarRepositoryInMemory;

  beforeEach(() => {
    rentalsRepositoryInMemoty = new RentalRepositoryInMemory();

    dayjsDateProvider = new DayjsDateProvider();
    carRepositoryInMemory = new CarRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemoty,
      dayjsDateProvider,
      carRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Corsa",
      description: "corsa hatch",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "123123",
      brand: "brand",
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another to the same user", async () => {
    await rentalsRepositoryInMemoty.create({
      car_id: "123",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12345",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There is a rental in progress for user!"));
  });

  it("should not be able to create a new rental if there is another to the same car", async () => {
    await rentalsRepositoryInMemoty.create({
      car_id: "123",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "123",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unvailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "12345",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
