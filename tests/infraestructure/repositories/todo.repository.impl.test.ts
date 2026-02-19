import { describe, expect, test, vi } from "vitest";
import { TodoRepositoryImpl } from "../../../src/infraestructure/repositories/todo.repository.impl";
import { UpdateTodoDto } from "../../../src/domain/dtos";

describe("Todo Repository Implementation", () => {
  const mockDatasource = {
    create: vi.fn(),
    update: vi.fn(),
    getAll: vi.fn(),
    getById: vi.fn(),
    deleteById: vi.fn(),
  };

  const todoRepository = new TodoRepositoryImpl(mockDatasource);

  test(`Todo repository implementation has all CRUD Methods`, () => {
    expect(todoRepository).toHaveProperty("create");
    expect(todoRepository).toHaveProperty("update");
    expect(todoRepository).toHaveProperty("getAll");
    expect(todoRepository).toHaveProperty("getById");
    expect(todoRepository).toHaveProperty("deleteById");
  });

  test(`Each todoRepository method calls its respective equal from given datasource`, async () => {
    const newTodoData = {
      completedAt: null,
      description: "some description",
    };

    const { updatedTodoFromDto } = UpdateTodoDto.update(newTodoData);

    const id = 1;

    await todoRepository.getAll();
    await todoRepository.getById(id);
    await todoRepository.create(newTodoData);
    await todoRepository.update(id, updatedTodoFromDto!);
    await todoRepository.deleteById(id);

    expect(mockDatasource.getAll).toHaveBeenCalled();
    expect(mockDatasource.getById).toHaveBeenCalledWith(id);
    expect(mockDatasource.create).toHaveBeenCalledWith(newTodoData);
    expect(mockDatasource.update).toHaveBeenCalledWith(id, updatedTodoFromDto);
    expect(mockDatasource.deleteById).toHaveBeenCalledWith(id);
  });
});
