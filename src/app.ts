import express from "express";
import bookRoutes from "./routes/book.routes";
import todoRoutes from "./routes/todo.route";
import { errorHandler } from "./middlewares/error.middleware";

class App {
    public app: express.Application;
    public port: number | string = 8080;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes() {
        this.app.get("/", (req, res) => {
            res.send("Welcome to the Book Library API");
        });
        this.app.use("/api/v1/books", bookRoutes);
        this.app.use("/api/v1/todos", todoRoutes);
    }

    private initializeErrorHandling() {
        this.app.use(errorHandler);
    }

    public startServer() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

export default App;