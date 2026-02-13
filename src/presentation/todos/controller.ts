import { Request, Response } from "express";
import { prismaClient } from "../../data/postgres";
import { CreateTodoDto } from "../../dtos/todos/create-todo.dto";

export class TodosController {
  constructor() {}

  getTodos = async (req: Request, res: Response) => {
    const todos = await prismaClient.todo.findMany();
    return res.json(todos);
  };

  getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id)!;
    if (isNaN(id))
      return res.status(400).json({ error: `Id is not a number.` });
    const todo = await prismaClient.todo.findFirst({
      where: {
        id,
      },
    });
    return todo !== null
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found.` });
  };

  createTodo = async (req: Request, res: Response) => {
    const { body } = req;
    const { error, createdTodoFromDto: creadtedTodoFromDto } =
      CreateTodoDto.create(body);
    if (error || !creadtedTodoFromDto) return res.status(400).json({ error });
    const newTodo = await prismaClient.todo.create({
      data: creadtedTodoFromDto,
    });
    return res.json(newTodo);
  };

  updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ error: `Id is not a number.` });

    const todo = await prismaClient.todo.findFirst({ where: { id } });

    if (todo === null)
      return res.status(404).json({ error: `Todo with id ${id} not found.` });
    const { body } = req;

    const { error, createdTodoFromDto: creadtedTodoFromDto } =
      CreateTodoDto.create(body);

    if (error || !creadtedTodoFromDto) return res.status(400).json({ error });

    const updatedTodo = await prismaClient.todo.update({
      where: { id },
      data: creadtedTodoFromDto.values,
    });

    return res.json(updatedTodo);
  };

  deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id." });
    const todoToDelete = await prismaClient.todo.findFirst({ where: { id } });
    if (todoToDelete === null)
      return res.status(404).json({ error: `Todo with id ${id} not found.` });
    try {
      const todo = await prismaClient.todo.delete({ where: { id: id } });
      return res.json(todo);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong. Todo not deleted." });
    }
  };
}
