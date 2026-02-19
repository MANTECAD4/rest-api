import { afterAll, beforeEach, describe, expect, test } from "vitest";
import { PostgresDatasource } from "../../../src/infraestructure/datasources/postgres.datasource";
import { prismaClient } from "../../../src/data/postgres";
import { TodoEntity } from "../../../src/domain/entities/todo.entity";

describe("Postgres Todo Datasource", () => {
  beforeEach(async () => await prismaClient.todo.deleteMany());
  afterAll(async () => await prismaClient.$disconnect());
  const postgresDatasource = new PostgresDatasource();
  const newTodoOptions = { completedAt: null, description: "New Todo" };
  test("should have all CRUD Methods", () => {
    expect(postgresDatasource).toHaveProperty("create");
    expect(postgresDatasource).toHaveProperty("update");
    expect(postgresDatasource).toHaveProperty("getAll");
    expect(postgresDatasource).toHaveProperty("getById");
    expect(postgresDatasource).toHaveProperty("deleteById");

    expect(postgresDatasource.create).toBeInstanceOf(Function);
    expect(postgresDatasource.update).toBeInstanceOf(Function);
    expect(postgresDatasource.getAll).toBeInstanceOf(Function);
    expect(postgresDatasource.getById).toBeInstanceOf(Function);
    expect(postgresDatasource.deleteById).toBeInstanceOf(Function);
  });

  test("'create' should return a TodoEntity instance after adding a new todo into the DB", async () => {
    const newTodo = await postgresDatasource.create(newTodoOptions);
    expect(newTodo).toEqual({ ...newTodoOptions, id: expect.any(Number) });
  });

  test(`'getAll' returns a list of Todo Entities`, async () => {
    const emptyTodosArray = await postgresDatasource.getAll();

    expect(emptyTodosArray).toEqual([]);

    await postgresDatasource.create(newTodoOptions);
    await postgresDatasource.create(newTodoOptions);

    const todosArray = await postgresDatasource.getAll();
    expect(todosArray).toHaveLength(2);
    todosArray.forEach((todo) => expect(todo).toBeInstanceOf(TodoEntity));
  });

  test(`'getById' should return null if todo doesn't exist`, async () => {
    const todo = await postgresDatasource.getById(0);
    expect(todo).toBeNull();
  });

  test(`'getById' should return a TodoEntity if todo exists`, async () => {
    await postgresDatasource.create(newTodoOptions);

    // Database assigns incremental Ids
    // Gets recently created todo to find out the its id (Database is cleared after each test)
    const todos = await postgresDatasource.getAll();
    const id = todos[0].id;

    const todoById = await postgresDatasource.getById(id);

    expect(todoById).toBeInstanceOf(TodoEntity);
    expect(todoById).toEqual(todos[0]);
  });

  test(`'deleteById' should return deleted todo`, async () => {
    await postgresDatasource.create(newTodoOptions);
    const todos = await postgresDatasource.getAll();

    const id = todos[0].id;

    const deletedTodo = await postgresDatasource.deleteById(id);
    expect(deletedTodo).toEqual(todos[0]);
  });
});
