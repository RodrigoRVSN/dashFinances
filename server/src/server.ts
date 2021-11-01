import express from "express";

import { cors } from "./middlewares/cors";
import { errorHandler } from "./middlewares/errorHandler";
import { routes } from "./routes";

const port = process.env.port || 3333;
const infoPort = port === 3333 && "http://localhost:3333";

const app = express();
app.use(express.json());
app.use(routes);
app.use(cors);
app.use(errorHandler);

app.listen(port, () => console.log(`🔥 Running in ${infoPort}`));
