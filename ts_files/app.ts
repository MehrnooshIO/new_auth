import express from "express";
import {authRouter} from "./routes/authRoutes";

const app = express();
const port = 3000;

app.listen(port);

app.use(express.json());

// CORS Handling
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    
    if (req.method === "OPTIONS") {
        
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE"
        );
        res.status(200).json({});
    }
    next();
})

app.use(authRouter());


app.get("/", (req, res) => {
    res.send("Hello World!");
});