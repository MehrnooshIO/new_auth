"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const crud_1 = require("../crud/crud");
const schemas_1 = require("../schemas/schemas");
const authRouter = () => {
    const router = express_1.default.Router();
    router.post("/signup", (req, res) => {
        const { error, value } = (0, schemas_1.UserSignUpValidator)(req.body);
        if (error) {
            res.status(400);
            res.json(error).send();
        }
        else {
            (0, crud_1.CreateNewUser)(value).then(userId => {
                res.status(201).json(userId).send();
            }).catch(err => {
                if (err == "User already exists") {
                    res.status(400);
                    res.json(err).send();
                }
                else {
                    res.status(500).json(`Internal Server Error: ${err}`).send();
                }
            });
        }
    });
    return router;
};
exports.authRouter = authRouter;
//# sourceMappingURL=authRoutes.js.map