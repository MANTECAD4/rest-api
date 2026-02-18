import { CreateTodoDto } from "../dtos/todos/create-todo.dto.js";
import { UpdateTodoDto } from "../dtos/todos/update-todo.dto.js";
import { TodoEntity } from "../entities/todo.entity.js";

export abstract class TodoDatasource {
  abstract create(createdTodoDto: CreateTodoDto): Promise<TodoEntity>;
  abstract update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity>;
  abstract getAll(): Promise<TodoEntity[]>;
  abstract getById(id: number): Promise<TodoEntity | null>;
  abstract deleteById(id: number): Promise<TodoEntity>;
}
