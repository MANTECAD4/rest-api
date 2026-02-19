import { describe, expect, test } from "vitest";
import { TodoDatasource } from "../../../src/domain/datasources/todo.datasource";
import { CreateTodoDto } from "../../../src/domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../../src/domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../../src/domain/entities/todo.entity";

describe("Todo Datasource Contract", () => {
  class MockTodoDatasource implements TodoDatasource {
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
  test("should force other classes to have CRUD Methods", () => {
    const mockTodoDatasource = new MockTodoDatasource();

    expect(mockTodoDatasource).toHaveProperty("create");
    expect(mockTodoDatasource).toHaveProperty("update");
    expect(mockTodoDatasource).toHaveProperty("getAll");
    expect(mockTodoDatasource).toHaveProperty("getById");
    expect(mockTodoDatasource).toHaveProperty("deleteById");

    expect(mockTodoDatasource.create).toBeInstanceOf(Function);
    expect(mockTodoDatasource.update).toBeInstanceOf(Function);
    expect(mockTodoDatasource.getAll).toBeInstanceOf(Function);
    expect(mockTodoDatasource.getById).toBeInstanceOf(Function);
    expect(mockTodoDatasource.deleteById).toBeInstanceOf(Function);
  });
});
