import { prismaClient } from "../../data/postgres.js";
import { TodoDatasource } from "../../domain/datasources/todo.datasource.js";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto.js";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto.js";
import { TodoEntity } from "../../domain/entities/todo.entity.js";

export class PostgresDatasource implements TodoDatasource {
  async create(createdTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prismaClient.todo.create({
      data: createdTodoDto,
    });

    return new TodoEntity(newTodo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const updatedTodo = await prismaClient.todo.update({
      where: { id },
      data: updateTodoDto.values,
    });
    return new TodoEntity(updatedTodo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prismaClient.todo.findMany();
    return todos.map((rawTodo) => new TodoEntity(rawTodo));
  }

  async getById(id: number): Promise<TodoEntity | null> {
    const rawTodo = await prismaClient.todo.findFirst({
      where: {
        id,
      },
    });
    return rawTodo !== null ? new TodoEntity(rawTodo) : null;
  }

  async deleteById(id: number): Promise<TodoEntity> {
    const rawTodo = await prismaClient.todo.delete({ where: { id: id } });
    return new TodoEntity(rawTodo);
  }
}
