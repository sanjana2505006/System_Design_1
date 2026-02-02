import { Book } from "../models/book.model";

interface IBookRepository {
    create(book: Book): Promise<Book>;
    findById(id: string): Promise<Book | null>;
    findAll(query: any): Promise<{ books: Book[], total: number }>;
    update(id: string, updates: Partial<Book>): Promise<Book | null>;
    delete(id: string): Promise<boolean>;
}

export class BookRepository implements IBookRepository {
    private books: Book[] = [];

    async create(book: Book): Promise<Book> {
        this.books.push(book);
        return book;
    }

    async findById(id: string): Promise<Book | null> {
        return this.books.find(b => b.id === id) || null;
    }

    async findAll(query: any): Promise<{ books: Book[], total: number }> {
        let filtered = this.books;

        // Search
        if (query.search) {
            const search = query.search.toLowerCase();
            filtered = filtered.filter(b =>
                b.title.toLowerCase().includes(search) ||
                b.author.toLowerCase().includes(search)
            );
        }

        // Filter
        if (query.author) {
            filtered = filtered.filter(b => b.author.toLowerCase() === query.author.toLowerCase());
        }
        if (query.minPrice) {
            filtered = filtered.filter(b => b.price >= Number(query.minPrice));
        }
        if (query.maxPrice) {
            filtered = filtered.filter(b => b.price <= Number(query.maxPrice));
        }

        // Sorting
        if (query.sortBy) {
            const sortField = query.sortBy as keyof Book;
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

        const paginatedBooks = filtered.slice(startIndex, endIndex);

        return { books: paginatedBooks, total: filtered.length };
    }

    async update(id: string, updates: Partial<Book>): Promise<Book | null> {
        const index = this.books.findIndex(b => b.id === id);
        if (index === -1) return null;

        this.books[index] = { ...this.books[index], ...updates, updatedAt: new Date() };
        return this.books[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.books.findIndex(b => b.id === id);
        if (index === -1) return false;

        this.books.splice(index, 1);
        return true;
    }
}
