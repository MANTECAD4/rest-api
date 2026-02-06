import { Request, Response } from "express";

const todos = [
  { id: 1, description: "Buy milk", createdAt: new Date() },
  { id: 2, description: "Buy ham", createdAt: new Date() },
  { id: 3, description: "Destroy Peru", createdAt: new Date() },
];

export class TodosController {
  constructor() {}

  getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  getTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id)!;
    if (isNaN(id))
      return res.status(400).json({ error: `Id is not a number.` });
    const todo = todos.find((todo) => todo.id === id);
    return todo
      ? res.json({
          todo,
        })
      : res.status(404).json({ error: `Todo with ${id} not found.` });
  };

  createTodo = (req: Request, res: Response) => {
    const { body } = req;
    const { description } = body;
    if (!description || typeof description !== "string")
      return res
        .status(400)
        .json({ error: "Description needs to be a string." });
    const newTodo = {
      id: todos.length + 1,
      createdAt: new Date(),
      description,
    };
    todos.push(newTodo);
    return res.json(newTodo);
  };

  updateTodo = (req: Request, res: Response) => {
    const {
      body: { description },
    } = req;

    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ error: `Id is not a number.` });

    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found.` });

    todo.description = description;
    return res.json(todo);
  };

  deleteTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found.` });

    todos.splice(todos.indexOf(todo), 1);
    return res.json(todo);
  };
}
