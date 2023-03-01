"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
//mongosee es para conectar BD
const mongoose_1 = __importDefault(require("mongoose"));
const server = new server_1.default();
//Rutas de la app
server.app.use("/user", usuario_1.default);
//Conectar BD
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram');
//Levantar Express
server.start(() => {
    console.log(`Servidor corriendo en puerto${server.port}`);
});
