import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

describe("Create Rental", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let rentalsRepositoryInMemoty: RentalRepositoryInMemory;

  beforeEach(() => {
    rentalsRepositoryInMemoty = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemoty);
  });

  it("should be able to create a new rental", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12345",
      expected_return_date: new Date(),
    });
  });
});
