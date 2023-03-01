"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = require("../models/userModel");
//Encriptado de contraseña
//instalar:
// npm install @types/bcrypt --save-dev
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRouters = (0, express_1.Router)();
/* hacer petición(GET, PUT, POSt....) */
/* userRouter.get("/prueba", (rep: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "Tu petición ha salido bien!!!",
  });
});
 */
//Ruta que voy a llamar para insertar BD
userRouters.post('/create', (req, res) => {
    //req es la respuesta al posteo y el body es del bodyParse
    //Info basic para inserción en mi bd
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
    };
    //Para GRABAR en BD
    // 1ºLlamo a mi modelo de usuario del userModel.ts:
    //luego lo pruebo en Postman
    userModel_1.Usuario.create(user)
        .then((userDB) => {
        res.json({
            ok: true,
            user: userDB,
        });
    })
        .catch((err) => {
        res.json({
            ok: false,
            err,
        });
    });
});
exports.default = userRouters;
