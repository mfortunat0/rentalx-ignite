import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

describe("Create car specification", () => {
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let carsRepositoryInMemory: CarRepositoryInMemory;
  let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a non-existent car", async () => {
    const car_id = "123";
    const specification_id = ["512312"];
    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specification_id,
      })
    ).rejects.toEqual(new AppError("Car doesnt exists"));
  });

  it("should not be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name",
      description: "description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await specificationRepositoryInMemory.create({
      name: "teste",
      description: "teste",
    });

    const specificationCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id: [specification.id],
    });

    expect(specificationCar).toHaveProperty("specifications");
    expect(specificationCar.specifications.length).toBe(1);
  });
});
