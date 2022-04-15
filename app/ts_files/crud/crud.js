"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNewUser = exports.CheckUserPassword = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const prisma = new client_1.PrismaClient({ log: ['query', 'info'] });
function FindUserByEmail(userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma.user.findUnique({
            where: {
                email: userEmail
            },
        });
        return result;
    });
}
// TODO: Add different message for wrong email or password
function CheckUserPassword(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield FindUserByEmail(user.email);
        if (result) {
            const match = yield bcrypt_1.default.compare(user.password, result.password);
            if (match) {
                return result;
            }
        }
        throw "Wrong Credentials";
    });
}
exports.CheckUserPassword = CheckUserPassword;
/**
 * Creates new user record in database
 * */
const CreateNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield FindUserByEmail(user.email);
    if (result) {
        throw "User already exists";
    }
    else {
        bcrypt_1.default.hash(user.password, saltRounds).then(function (hash) {
            return __awaiter(this, void 0, void 0, function* () {
                const newUser = yield prisma.user.create({ data: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: hash
                    },
                });
                return newUser.id;
            });
        });
    }
});
exports.CreateNewUser = CreateNewUser;
//# sourceMappingURL=crud.js.map