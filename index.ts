import Server from "./class/server";
//mongosee es para conectar BD
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postRoutes from "./routes/post";
import userRoutes from "./routes/usuario";
//Para subir img
import fileUpload from "express-fileupload";

const server = new Server();

//Body parse (es una función q se ejecuta (post, puts) cualquier peticion y preprara el objeto )
//urlencoded --> x-wwww-form-urlencoded
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//Imagenes File Upload
server.app.use(fileUpload());

//Rutas de la app usuarios
server.app.use("/user", userRoutes);
//ruta post
server.app.use("/posts", postRoutes);

//Conectar BD
mongoose.connect("mongodb://127.0.0.1:27017/fotosgramTutu");

//Levantar Express
server.start(() => {
  console.log(`Servidor corriendo en puerto${server.port}`);
});
