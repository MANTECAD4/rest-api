import { describe, expect, test } from "vitest";
import { TodoRepository } from "../../../src/domain/repositories/todo.repository";
import { CreateTodoDto } from "../../../src/domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../../src/domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../../src/domain/entities/todo.entity";

describe("Todo Repository Contract", () => {
  class MockTodoRepository implements TodoRepository {
    create(createdTodoDto: CreateTodoDto): Promise<TodoEntity> {
      throw new Error("Method not implemented.");
    }
    update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
      throw new Error("Method not implemented.");
    }
    getAll(): Promise<TodoEntity[]> {
      throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<TodoEntity | null> {
      throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<TodoEntity> {
      throw new Error("Method not implemented.");
    }
  }
  test("should force other classes to have CRUD methods", () => {
    const mockTodoRepository = new MockTodoRepository();
    expect(mockTodoRepository).toHaveProperty("create");
    expect(mockTodoRepository).toHaveProperty("update");
    expect(mockTodoRepository).toHaveProperty("deleteById");
    expect(mockTodoRepository).toHaveProperty("getAll");
    expect(mockTodoRepository).toHaveProperty("getById");

    expect(mockTodoRepository.create).toBeInstanceOf(Function);
    expect(mockTodoRepository.update).toBeInstanceOf(Function);
    expect(mockTodoRepository.deleteById).toBeInstanceOf(Function);
    expect(mockTodoRepository.getAll).toBeInstanceOf(Function);
    expect(mockTodoRepository.getById).toBeInstanceOf(Function);
  });
});
