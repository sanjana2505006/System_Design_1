"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const bookController = new book_controller_1.BookController();
router.route("/")
    .get(bookController.getAllBooks)
    .post(auth_middleware_1.protect, bookController.createBook);
router.route("/:id")
    .get(bookController.getBookById)
    .patch(auth_middleware_1.protect, bookController.updateBook)
    .delete(auth_middleware_1.protect, bookController.deleteBook);
exports.default = router;
