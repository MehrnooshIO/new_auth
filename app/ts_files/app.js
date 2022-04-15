"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = require("./routes/authRoutes");
const app = (0, express_1.default)();
const port = 3000;
app.listen(port);
app.use(express_1.default.json());
// CORS Handling
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        res.status(200).json({});
    }
    next();
});
app.use((0, authRoutes_1.authRouter)());
app.use((0, authRoutes_1.loginRouter)());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
//# sourceMappingURL=app.js.map