import { Router } from "express";
import { TodosController } from "./controller.js";
import { PostgresDatasource } from "../../infraestructure/datasources/postgres.datasource.js";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const postgresDatasource = new PostgresDatasource();
    const todosController = new TodosController(postgresDatasource);

    router.get("/", todosController.getTodos);
    router.get("/:id", todosController.getTodoById);
    router.post("/", todosController.createTodo);
    router.put("/:id", todosController.updateTodo);
    router.delete("/:id", todosController.deleteTodo);

    return router;
  }
}
