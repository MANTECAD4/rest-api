import request from "supertest";
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  test,
  beforeEach,
} from "vitest";
import { testServer } from "../test-server";
import { prismaClient } from "../../../src/data/postgres";
import { PostgresDatasource } from "../../../src/infraestructure/datasources/postgres.datasource";

describe("Todo routes", () => {
  beforeAll(async () => await testServer.start());

  afterAll(async () => {
    await testServer.close();
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    await prismaClient.todo.deleteMany();
  });

  const todo1 = {
    completedAt: null,
    description: "Un todo por aqui",
  };

  const todo2 = {
    completedAt: null,
    description: "Otro todo por aca",
  };
  const postgresDatasource = new PostgresDatasource();

  describe(`GET /api/todos - get all TODOs`, () => {
    test("should return an array of TODOs", async () => {
      await postgresDatasource.create(todo1);

      await postgresDatasource.create(todo2);

      const response = await request(testServer.app)
        .get("/api/todos")
        .expect(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe("GET /api/todos/:id - get todo by id", () => {
    test("should return a single todo- TODO exists", async () => {
      const response = await await postgresDatasource.create(todo1);

      const createdTodo = await postgresDatasource.create(todo2);

      const { body } = await request(testServer.app)
        .get(`/api/todos/${createdTodo.id}`)
        .expect(200);

      expect(body).toEqual({
        completedAt: createdTodo.completedAt,
        id: createdTodo.id,
        description: createdTodo.description,
      });
    });

    test("should return an error - TODO doesn't exist", async () => {
      const { body } = await request(testServer.app)
        .get(`/api/todos/0`)
        .expect(404);
      // console.log({ body });
    });

    test("should return an error- Invalid ID ", async () => {
      const { body } = await request(testServer.app)
        .get(`/api/todos/xd`)
        .expect(400);
      // console.log({ body });
    });
  });

  describe("POST /api/todos - create TODO", () => {
    test("should return a 201 response code & TODO's info", async () => {
      const { body } = await request(testServer.app)
        .post("/api/todos")
        .send(todo1)
        .expect(201);
      expect(body).toEqual({
        id: expect.any(Number),
        description: expect.any(String),
        completedAt: null,
      });
    });
    test("should return a 400 response code & an error (string)", async () => {
      const { body } = await request(testServer.app)
        .post("/api/todos")
        .send({})
        .expect(400);

      expect(body.error).toContain("Description property is required");
    });
  });

  describe("PUT /api/todos/:id - update TODO", () => {
    test("should return a 201 response code & the TODO instance after modification", async () => {
      const createdTodo = await postgresDatasource.create(todo1);
      const newDescripton = "I got modified to test update todo functionality";
      const { body } = await request(testServer.app)
        .put(`/api/todos/${createdTodo.id}`)
        .send({ description: newDescripton })
        .expect(201);

      expect(body).toEqual({
        id: createdTodo.id,
        completedAt: createdTodo.completedAt,
        description: newDescripton,
      });
    });

    test("should return a 400 response code & an error if ID is NaN", async () => {
      const { body } = await request(testServer.app)
        .put("/api/todos/xd")
        .send({ description: "hi world" })
        .expect(400);

      expect(body.error).toContain("Id is not a number");
    });

    test(`should return a 404 response code & an error if specified TODO doesn't exist`, async () => {
      const id = 0;
      const {
        body: { error },
      } = await request(testServer.app)
        .put(`/api/todos/${id}`)
        .send({ description: "hi world" })
        .expect(404);

      expect(error).toContain(`Todo with id ${id} not found.`);
    });

    test(`should return a 400 response code & an error if the request body doesn't include any value`, async () => {
      const {
        body: { error },
      } = await request(testServer.app).put("/api/todos/0").expect(400);

      expect(error).toBe("No data recieved. At least one value is required.");
    });

    test(`should return a 400 response code & an error if an invalid date is provided for completedAt`, async () => {
      const createdTodo = await postgresDatasource.create(todo1);
      const { body } = await request(testServer.app)
        .put(`/api/todos/${createdTodo.id}`)
        .send({ completedAt: "not-a-valid-date" })
        .expect(400);

      expect(body.error).toMatch(/Invalid date/i);
    });

    test(`should return a 400 response code & an error if neither description or completedAt values are provided`, async () => {
      const createdTodo = await postgresDatasource.create(todo1);
      const { body } = await request(testServer.app)
        .put(`/api/todos/${createdTodo.id}`)
        .send({
          someProperty:
            "A value just to not send an empty object, but it is still missing the required values",
        })
        .expect(400);

      expect(body.error).toBe("At least one valid field is required");
    });
  });

  describe("DELETE /api/todos/:id - delete TODO", () => {
    test("should return a 400 status code & an error if provided ID IS NaN", async () => {
      const { body } = await request(testServer.app)
        .delete("/api/todos/xd")
        .expect(400);
      expect(body.error).toEqual(expect.any(String));
    });

    test(`should return a 404 status code if specified TODO doesn't exist`, async () => {
      const {
        body: { error },
      } = await request(testServer.app).delete("/api/todos/0").expect(404);

      expect(error).toContain("not found");
    });

    test(`should return deleted's todo instance`, async () => {
      const createdTodo = await postgresDatasource.create(todo1);
      const { body } = await request(testServer.app)
        .delete(`/api/todos/${createdTodo.id}`)
        .expect(200);
      expect(body).toEqual(createdTodo);
    });
  });
});
