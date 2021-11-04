"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = require("./middlewares/cors");
const routes_1 = require("./routes");
const PORT = process.env.PORT || 3333;
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.cors);
app.use(routes_1.routes);
app.get("/", (req, res) => res.send("oi"));
app.listen(PORT, () => console.log(`🔥 Running in http://localhost:${PORT}`));
