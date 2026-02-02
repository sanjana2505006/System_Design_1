import { BookRepository } from "../repositories/book.repository";
import { Book } from "../models/book.model";
import { AppError } from "../utils/AppError";

export class BookService {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    async createBook(data: any): Promise<Book> {
        // Basic validation
        if (!data.title || !data.author || !data.price) {
            throw new AppError("Missing required fields: title, author, price", 400);
        }

        const newBook = new Book(
            Math.random().toString(36).substr(2, 9), // Simple ID generation
            data.title,
            data.author,
            Number(data.price),
            Number(data.stock) || 0,
            Number(data.publishedYear) || new Date().getFullYear(),
            new Date(),
            new Date()
        );

        return await this.bookRepository.create(newBook);
    }

    async getAllBooks(query: any) {
        return await this.bookRepository.findAll(query);
    }

    async getBookById(id: string): Promise<Book> {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new AppError("Book not found", 404);
        }
        return book;
    }

    async updateBook(id: string, updates: any): Promise<Book> {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new AppError("Book not found", 404);
        }

        const updatedBook = await this.bookRepository.update(id, updates);
        return updatedBook!;
    }

    async deleteBook(id: string): Promise<void> {
        const result = await this.bookRepository.delete(id);
        if (!result) {
            throw new AppError("Book not found", 404);
        }
    }
}
