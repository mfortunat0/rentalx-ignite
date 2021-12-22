import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

describe("List Cars", () => {
  let listCarsUseCase: ListCarsUseCase;
  let carRepositoryInMemory: CarRepositoryInMemory;

  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carRepositoryInMemory.create({
      name: "car1",
      description: "description1",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand1",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carRepositoryInMemory.create({
      name: "car1",
      description: "description1",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand2",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Brand2",
    });
    expect(cars).toEqual([car]);
  });
});
