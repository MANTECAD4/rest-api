import { describe, expect, test } from "vitest";
import { CreateTodoDto } from "../../../../src/domain/dtos/todos/create-todo.dto";

describe("Create Todo Data transfer object", () => {
  test("should return an instance of CreateTodoDto if 'description' is provided", () => {
    const requestBody = {
      description: "Im the body of a request",
    };
    const { error, createdTodoFromDto } = CreateTodoDto.create(requestBody);
    expect(error).toBeUndefined();
    expect(createdTodoFromDto).toBeInstanceOf(CreateTodoDto);
    expect(createdTodoFromDto!.completedAt).toBeNull();
  });

  test("should return an error (string) if 'description' is NOT provided", () => {
    const requestBody = {
      //   description: "Im the body of a request",
      otherField: "Just to add some garbage",
    };
    const { error, createdTodoFromDto } = CreateTodoDto.create(requestBody);
    expect(error).toMatch(/description/i);
    expect(createdTodoFromDto).toBeUndefined();
  });
});
