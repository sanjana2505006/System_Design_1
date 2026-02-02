"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("../services/book.service");
class BookController {
    constructor() {
        this.createBook = async (req, res, next) => {
            try {
                const book = await this.bookService.createBook(req.body);
                res.status(201).json({
                    status: "success",
                    data: { book }
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllBooks = async (req, res, next) => {
            try {
                const result = await this.bookService.getAllBooks(req.query);
                res.status(200).json({
                    status: "success",
                    results: result.books.length,
                    total: result.total,
                    data: { books: result.books }
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.getBookById = async (req, res, next) => {
            try {
                const book = await this.bookService.getBookById(req.params.id);
                res.status(200).json({
                    status: "success",
                    data: { book }
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateBook = async (req, res, next) => {
            try {
                const book = await this.bookService.updateBook(req.params.id, req.body);
                res.status(200).json({
                    status: "success",
                    data: { book }
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteBook = async (req, res, next) => {
            try {
                await this.bookService.deleteBook(req.params.id);
                res.status(204).json({
                    status: "success",
                    data: null
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.bookService = new book_service_1.BookService();
    }
}
exports.BookController = BookController;
