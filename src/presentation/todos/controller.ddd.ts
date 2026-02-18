import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto.js";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto.js";
import { TodoRepository } from "../../domain/repositories/todo.repository.js";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  };

  getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id)!;
    if (isNaN(id))
      return res.status(400).json({ error: `Id is not a number.` });
    const todo = await this.todoRepository.getById(id);

    return todo !== null
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found.` });
  };

  createTodo = async (req: Request, res: Response) => {
    const { body } = req;
    const { error, createdTodoFromDto } = CreateTodoDto.create(body);

    if (error || !createdTodoFromDto) return res.status(400).json({ error });

    const newTodo = await this.todoRepository.create(createdTodoFromDto);

    return res.json(newTodo);
  };

  updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: `Id is not a number.` });

    const todo = await this.todoRepository.getById(id);

    if (todo === null)
      return res.status(404).json({ error: `Todo with id ${id} not found.` });

    const { body } = req;

    if (!body)
      return res
        .status(400)
        .json({ error: "No data recived. At least one value is required." });

    const { error, updatedTodoFromDto } = UpdateTodoDto.update(body);

    if (error || !updatedTodoFromDto) return res.status(400).json({ error });

    const updatedTodo = await this.todoRepository.update(
      id,
      updatedTodoFromDto,
    );

    return res.json(updatedTodo);
  };

  deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id." });

    const todoToDelete = await this.todoRepository.getById(id);

    if (todoToDelete === null)
      return res.status(404).json({ error: `Todo with id ${id} not found.` });

    try {
      const todo = await this.todoRepository.deleteById(id);
      return res.json(todo);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong. Todo not deleted." });
    }
  };
}
