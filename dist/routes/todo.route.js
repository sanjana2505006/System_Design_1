"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class TodoRoute {
    constructor() {
        this.path = "/todos";
        this.route = express_1.default.Router();
    }
    initializeRoutes() {
        this.route.get(this.path, (req, res) => {
            res.send("Get all todos");
        });
    }
}
