import { Router } from "express";
import { BookController } from "../controllers/book.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();
const bookController = new BookController();

router.route("/")
    .get(bookController.getAllBooks)
    .post(protect, bookController.createBook);

router.route("/:id")
    .get(bookController.getBookById)
    .patch(protect, bookController.updateBook)
    .delete(protect, bookController.deleteBook);

export default router;
