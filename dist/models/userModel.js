"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
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
//Modelo de usuario UserModel !!!!
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
