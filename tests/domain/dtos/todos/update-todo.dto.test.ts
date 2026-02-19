import { describe, expect, test } from "vitest";
import { UpdateTodoDto } from "../../../../src/domain/dtos/todos/update-todo.dto";
import { error } from "node:console";

describe("Update Todo DTO", () => {
  test("should return an error if no value is not provided", () => {
    const { error, updatedTodoFromDto } = UpdateTodoDto.update({});
    expect(error).toEqual(expect.any(String));
    expect(updatedTodoFromDto).toBeUndefined();
  });

  test(`'Values' getter returns only given values (only those we expect to modify)`, () => {
    const { error: error1, updatedTodoFromDto: updatedTodoFromDto1 } =
      UpdateTodoDto.update({
        description: "Just a description",
      });
    const { error: error2, updatedTodoFromDto: updatedTodoFromDto2 } =
      UpdateTodoDto.update({
        completedAt: "2026-10-10",
      });

    expect(error1).toBeUndefined();
    expect(updatedTodoFromDto1!.values).toStrictEqual({
      description: expect.any(String),
    });

    expect(error2).toBeUndefined();
    expect(updatedTodoFromDto2!.values).toStrictEqual({
      completedAt: expect.any(Date),
    });
  });

  test('should validate given date for "completedAt" property', () => {
    const { error: error1 } = UpdateTodoDto.update({
      completedAt: "2020-10-10",
    });

    const { error: error2 } = UpdateTodoDto.update({
      completedAt: "Not a valid date",
    });

    expect(error1).toBeUndefined();
    expect(error2).toContain("Invalid date");
  });
});
