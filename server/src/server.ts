import express from "express";

const port = process.env.port || 4000;
const infoPort = port === 4000 && "http://localhost:4000";

const app = express();

app.get("/", (req, res) => res.send("oi"));

app.listen(port, () => console.log(`🔥 Running in ${infoPort}`));
