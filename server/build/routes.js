"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const FinancesController_1 = require("./controllers/FinancesController");
const UserController_1 = require("./controllers/UserController");
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const routes = express_1.Router();
exports.routes = routes;
routes.post("/register", UserController_1.UserController.store);
routes.post("/login", UserController_1.UserController.login);
routes.get("/me", authMiddleware_1.default, UserController_1.UserController.show);
routes.get("/finance/all", authMiddleware_1.default, FinancesController_1.FinancesController.show);
routes.post("/finance/new", authMiddleware_1.default, FinancesController_1.FinancesController.store);
routes.delete("/finance/delete/:id", authMiddleware_1.default, FinancesController_1.FinancesController.delete);
routes.put("/finance/update/:id", authMiddleware_1.default, FinancesController_1.FinancesController.update);
