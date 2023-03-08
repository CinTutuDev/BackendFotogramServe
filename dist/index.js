"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
//mongosee es para conectar BD
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const post_1 = __importDefault(require("./routes/post"));
const usuario_1 = __importDefault(require("./routes/usuario"));
//Para subir img
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const server = new server_1.default();
//Body parse (es una función q se ejecuta (post, puts) cualquier peticion y preprara el objeto )
//urlencoded --> x-wwww-form-urlencoded
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Imagenes File Upload
server.app.use((0, express_fileupload_1.default)());
server.app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
//Rutas de la app usuarios
server.app.use("/user", usuario_1.default);
//ruta post
server.app.use("/posts", post_1.default);
//Conectar BD
mongoose_1.default.connect("mongodb://127.0.0.1:27017/fotosgramTutu");
//Levantar Express
server.start(() => {
    console.log(`Servidor corriendo en puerto${server.port}`);
    console.log('Base de datos ONLINE');
});
