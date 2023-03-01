"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
//mongosee es para conectar BD
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = new server_1.default();
//Body parse (es una función q se ejecuta (post, puts) cualquier peticion y preprara el objeto )
//urlencoded --> x-wwww-form-urlencoded
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Rutas de la app
server.app.use("/user", usuario_1.default);
//Conectar BD
mongoose_1.default.connect("mongodb://127.0.0.1:27017/fotosgramTutu");
//Levantar Express
server.start(() => {
    console.log(`Servidor corriendo en puerto${server.port}`);
});
