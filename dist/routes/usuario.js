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
const token_1 = __importDefault(require("../class/token"));
const autentication_1 = require("../middlewares/autentication");
const userRoutes = (0, express_1.Router)();
//-*-------------------------------------------------CREAR LOGIN-----------------------------
userRoutes.post("/login", (req, res) => {
    const body = req.body;
    userModel_1.Usuario.findOne({ email: body.email }).then((user) => {
        if (!user) {
            res.json({ ok: false, message: "User or password incorrect" });
        }
        else {
            if (!bcrypt_1.default.compareSync(body.password, user.password)) {
                res.json({ ok: false, message: "User or password incorrect" });
            }
            else {
                const tokenUser = token_1.default.getJwtToken({
                    _id: user._id,
                    nombre: user.nombre,
                    email: user.email,
                    avatar: user.avatar,
                });
                res.json({ ok: true, token: tokenUser });
            }
        }
    });
});
/* hacer petición(GET, PUT, POSt....) */
//---------------------------------------------------CREAR USUARIO------------------------------
//Ruta que voy a llamar para insertar BD
userRoutes.post("/create", (req, res) => {
    //req es la respuesta al posteo y el body es del bodyParse
    //Info basic para inserción en mi bd
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
    };
    //---------------Para GRABAR en BD---------------
    // 1ºLlamo a mi modelo de usuario del userModel.ts:
    //luego lo pruebo en Postman
    userModel_1.Usuario.create(user)
        .then((userDB) => {
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar,
        });
        res.json({
            ok: true,
            token: tokenUser,
        });
    })
        .catch((err) => {
        res.json({
            ok: false,
            err,
        });
    });
});
//-------------------------------------------------------ACTUALIZAR USUARIOS------------------------------
userRoutes.post("/update", autentication_1.verificaToken, (req, res) => {
    //Antes necesito verificar que el Token sea valido --> middlewares\autentication.ts
    //middlewares --> se ejecuta antes de la ruta ... esta
    res.json({
        ok: true,
        usuario: req.usuario,
    });
});
exports.default = userRoutes;
