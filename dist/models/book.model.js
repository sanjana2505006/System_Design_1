"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(id, title, author, price, stock, publishedYear, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.price = price;
        this.stock = stock;
        this.publishedYear = publishedYear;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Book = Book;
