import express from "express";
import { authRouter } from "./routes/authRoutes";

const app = express();
const port = 3000;

app.listen(port);

app.use(express.json());
app.use(authRouter());

app.get("/", (req, res) => {
    res.send("Hello World!");
});