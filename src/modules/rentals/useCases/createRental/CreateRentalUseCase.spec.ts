import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

describe("Create Rental", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let rentalsRepositoryInMemoty: RentalRepositoryInMemory;

  beforeEach(() => {
    rentalsRepositoryInMemoty = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemoty);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12345",
      expected_return_date: new Date(),
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another to the same user", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12345",
        expected_return_date: new Date(),
      });

      const rental = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12345",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another to the same car", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "12345",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12345",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
