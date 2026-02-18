import { TodoDatasource } from "../../domain/datasources/todo.datasource.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { TodoEntity } from "../../domain/entities/todo.entity.js";
import { TodoRepository } from "../../domain/repositories/todo.repository.js";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly todoDatasource: TodoDatasource) {}
  async create(createdTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoDatasource.create(createdTodoDto);
  }
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoDatasource.update(id, updateTodoDto);
  }
  async getAll(): Promise<TodoEntity[]> {
    return this.todoDatasource.getAll();
  }
  async getById(id: number): Promise<TodoEntity | null> {
    return this.todoDatasource.getById(id);
  }
  async deleteById(id: number): Promise<TodoEntity> {
    return this.todoDatasource.deleteById(id);
  }
}
