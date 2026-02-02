import express, {Router} from "express";
class TodoRoute{
    path: string = "/todos";
    route: Router = express.Router();
    initializeRoutes(){
        this.route.get(this.path, (req, res) => {
            res.send("Get all todos");
        });
    }

}