"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignUpValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const UserSignUpSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
function UserSignUpValidator(user) {
    return UserSignUpSchema.validate(user);
}
exports.UserSignUpValidator = UserSignUpValidator;
//# sourceMappingURL=schemas.js.map