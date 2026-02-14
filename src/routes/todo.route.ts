import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();
const todoController = new TodoController();

router.route("/")
    .get(todoController.getAllTodos)
    .post(todoController.createTodo);

router.route("/:id")
    .get(todoController.getTodoById)
    .patch(todoController.updateTodo)
    .delete(todoController.deleteTodo);


export default router;