import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

describe("Create car specification", () => {
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let carsRepositoryInMemory: CarRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a non-existent car", () => {
    expect(async () => {
      const car_id = "123";
      const specifications = ["512312"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to add a new specification to a non-existent car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "category",
    });
    const specifications = ["512312"];
    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications,
    });
  });
});
