"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
class App {
    constructor() {
        this.port = 8080;
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeRoutes() {
        this.app.get("/", (req, res) => {
            res.send("Welcome to the Book Library API");
        });
        this.app.use("/api/v1/books", book_routes_1.default);
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.errorHandler);
    }
    startServer() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
exports.default = App;
