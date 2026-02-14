import { Todo } from "../models/todo.model";

interface ITodoRepository {
    create(todo: Todo): Promise<Todo>;
    findById(id: string): Promise<Todo | null>;
    findAll(query: any): Promise<{ todos: Todo[], total: number }>;
    update(id: string, updates: Partial<Todo>): Promise<Todo | null>;
    delete(id: string): Promise<boolean>;
}

export class TodoRepository implements ITodoRepository {
    private todos: Todo[] = [];

    async create(todo: Todo): Promise<Todo> {
        this.todos.push(todo);
        return todo;
    }

    async findById(id: string): Promise<Todo | null> {
        return this.todos.find(t => t.id === id) || null;
    }

    async findAll(query: any): Promise<{ todos: Todo[], total: number }> {
        let filtered = this.todos;

        // Search
        if (query.search) {
            const search = query.search.toLowerCase();
            filtered = filtered.filter(t =>
                t.title.toLowerCase().includes(search) ||
                t.description.toLowerCase().includes(search)
            );
        }

        // Filter by completion status
        if (query.completed !== undefined) {
            const isCompleted = query.completed === 'true';
            filtered = filtered.filter(t => t.completed === isCompleted);
        }

        // Sorting
        if (query.sortBy) {
            const sortField = query.sortBy as keyof Todo;
            const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
            filtered.sort((a, b) => {
                if (a[sortField] < b[sortField]) return -1 * sortOrder;
                if (a[sortField] > b[sortField]) return 1 * sortOrder;
                return 0;
            });
        }

        // Pagination
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedTodos = filtered.slice(startIndex, endIndex);

        return { todos: paginatedTodos, total: filtered.length };
    }

    async update(id: string, updates: Partial<Todo>): Promise<Todo | null> {
        const index = this.todos.findIndex(t => t.id === id);
        if (index === -1) return null;

        this.todos[index] = { ...this.todos[index], ...updates, updatedAt: new Date() };
        return this.todos[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.todos.findIndex(t => t.id === id);
        if (index === -1) return false;

        this.todos.splice(index, 1);
        return true;
    }
}
