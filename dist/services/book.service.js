"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_repository_1 = require("../repositories/book.repository");
const book_model_1 = require("../models/book.model");
const AppError_1 = require("../utils/AppError");
class BookService {
    constructor() {
        this.bookRepository = new book_repository_1.BookRepository();
    }
    async createBook(data) {
        // Basic validation
        if (!data.title || !data.author || !data.price) {
            throw new AppError_1.AppError("Missing required fields: title, author, price", 400);
        }
        const newBook = new book_model_1.Book(Math.random().toString(36).substr(2, 9), // Simple ID generation
        data.title, data.author, Number(data.price), Number(data.stock) || 0, Number(data.publishedYear) || new Date().getFullYear(), new Date(), new Date());
        return await this.bookRepository.create(newBook);
    }
    async getAllBooks(query) {
        return await this.bookRepository.findAll(query);
    }
    async getBookById(id) {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new AppError_1.AppError("Book not found", 404);
        }
        return book;
    }
    async updateBook(id, updates) {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new AppError_1.AppError("Book not found", 404);
        }
        const updatedBook = await this.bookRepository.update(id, updates);
        return updatedBook;
    }
    async deleteBook(id) {
        const result = await this.bookRepository.delete(id);
        if (!result) {
            throw new AppError_1.AppError("Book not found", 404);
        }
    }
}
exports.BookService = BookService;
