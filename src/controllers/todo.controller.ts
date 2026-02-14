import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todo.service";

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    createTodo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todo = await this.todoService.createTodo(req.body);
            res.status(201).json({
                status: "success",
                data: { todo }
            });
        } catch (error) {
            next(error);
        }
    };

    getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.todoService.getAllTodos(req.query);
            res.status(200).json({
                status: "success",
                results: result.todos.length,
                total: result.total,
                data: { todos: result.todos }
            });
        } catch (error) {
            next(error);
        }
    };

    getTodoById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todo = await this.todoService.getTodoById(req.params.id as string);
            res.status(200).json({
                status: "success",
                data: { todo }
            });
        } catch (error) {
            next(error);
        }
    };

    updateTodo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todo = await this.todoService.updateTodo(req.params.id as string, req.body);
            res.status(200).json({
                status: "success",
                data: { todo }
            });
        } catch (error) {
            next(error);
        }
    };

    deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.todoService.deleteTodo(req.params.id as string);
            res.status(204).json({
                status: "success",
                data: null
            });
        } catch (error) {
            next(error);
        }
    };
}
