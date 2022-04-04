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
app.use((0, authRoutes_1.authRouter)());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
//# sourceMappingURL=app.js.map