import { TodoRepository } from "../repositories/todo.repository";
import { Todo } from "../models/todo.model";
import { AppError } from "../utils/AppError";

export class TodoService {
    private todoRepository: TodoRepository;

    constructor() {
        this.todoRepository = new TodoRepository();
    }

    async createTodo(data: any): Promise<Todo> {
        // Validation
        if (!data.title) {
            throw new AppError("Title is required", 400);
        }

        const newTodo = new Todo(
            Math.random().toString(36).substr(2, 9),
            data.title,
            data.description || "",
            false,
            new Date(),
            new Date()
        );

        return await this.todoRepository.create(newTodo);
    }

    async getAllTodos(query: any) {
        return await this.todoRepository.findAll(query);
    }

    async getTodoById(id: string): Promise<Todo> {
        const todo = await this.todoRepository.findById(id);
        if (!todo) {
            throw new AppError("Todo not found", 404);
        }
        return todo;
    }

    async updateTodo(id: string, updates: any): Promise<Todo> {
        const todo = await this.todoRepository.findById(id);
        if (!todo) {
            throw new AppError("Todo not found", 404);
        }

        // Logic to toggle completed?
        // Or generic update
        const updatedTodo = await this.todoRepository.update(id, updates);
        return updatedTodo!;
    }

    async deleteTodo(id: string): Promise<void> {
        const result = await this.todoRepository.delete(id);
        if (!result) {
            throw new AppError("Todo not found", 404);
        }
    }
}
