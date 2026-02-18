import { CreateTodoDto } from "../../dtos/index.js";
import { TodoEntity } from "../../entities/todo.entity.js";
import { TodoRepository } from "../../repositories/todo.repository.js";

export class CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  execute = async (createTodoDto: CreateTodoDto): Promise<TodoEntity> => {
    return this.todoRepository.create(createTodoDto);
  };
}
