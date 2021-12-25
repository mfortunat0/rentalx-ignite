import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "category",
    });
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "category",
    });
    await expect(
      createCarUseCase.execute({
        name: "name",
        description: "description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 50,
        brand: "Brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car alredy exists"));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "category",
    });
    expect(car.available).toBeTruthy();
  });
});
