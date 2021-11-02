import { Router } from "express";

import { FinancesController } from "./controllers/FinancesController";
import { UserController } from "./controllers/UserController";
import authMiddleware from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/register", UserController.store);
routes.post("/login", UserController.login);
routes.get("/me", authMiddleware, UserController.show);

routes.get("/finance/all", authMiddleware, FinancesController.show);
routes.post("/finance/new", authMiddleware, FinancesController.store);
routes.delete("/finance/delete/:id", authMiddleware, FinancesController.delete);
routes.put("/finance/update/:id", authMiddleware, FinancesController.update);

export { routes };
