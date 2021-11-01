import { Router } from "express";

import { FinancesController } from "./controllers/FinancesController";
import { UserController } from "./controllers/UserController";
import authMiddleware from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/register", UserController.store);
routes.get("/login", UserController.login);

routes.post("/finance/new", authMiddleware, FinancesController.store);
routes.get("/finance/all", authMiddleware, FinancesController.show);
routes.delete("/finance/delete/:id", authMiddleware, FinancesController.delete);
routes.put("/finance/update/:id", authMiddleware, FinancesController.update);

export { routes };
