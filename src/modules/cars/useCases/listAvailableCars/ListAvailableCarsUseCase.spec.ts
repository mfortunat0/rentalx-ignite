import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

describe("List Cars", () => {
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;
  let carRepositoryInMemory: CarRepositoryInMemory;

  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carRepositoryInMemory.create({
      name: "car1",
      description: "description1",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand2",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand2",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carRepositoryInMemory.create({
      name: "car3",
      description: "description1",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand2",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "car3",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carRepositoryInMemory.create({
      name: "car1",
      description: "description1",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand2",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });
    expect(cars).toEqual([car]);
  });
});
