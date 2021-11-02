import "dotenv/config";
import express from "express";

import { cors } from "./middlewares/cors";
import { routes } from "./routes";

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use(cors);
app.use(routes);

app.get("/", (req, res) => res.send("oi"));

app.listen(PORT, () => console.log(`🔥 Running in http://localhost:${PORT}`));
