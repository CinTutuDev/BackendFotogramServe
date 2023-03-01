"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
//Creacion modelo Base Datos
const userSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"],
    },
    avatar: {
        type: String,
        default: "av-1.png",
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es necesario"],
    },
    password: {
        type: String,
        required: [true, "El pass es necesario"],
    },
});
userSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
//Modelo de usuario UserModel !!!!
exports.Usuario = (0, mongoose_1.model)("Usuario", userSchema);
