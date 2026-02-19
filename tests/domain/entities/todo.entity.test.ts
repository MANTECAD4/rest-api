import { describe, expect, test } from "vitest";
import {
  TodoEntity,
  TodoEntityOptions,
} from "../../../src/domain/entities/todo.entity";

describe("Todo Entity", () => {
  test("should create a Todo instance", () => {
    const options: TodoEntityOptions = {
      id: 1,
      description: "Test todo uwu",
      completedAt: null,
    };
    const todo = new TodoEntity(options);

    expect(todo).toBeInstanceOf(TodoEntity);

    expect(todo).toHaveProperty("id");
    expect(todo).toHaveProperty("description");
    expect(todo).toHaveProperty("completedAt");

    expect(todo.completedAt).toBeNull();
  });
});
