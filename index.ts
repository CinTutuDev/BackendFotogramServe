import Server from "./class/server";
import userRouters from "./routes/usuario";
//mongosee es para conectar BD
import mongoose from "mongoose";
import bodyParser from "body-parser";

const server = new Server();

//Body parse (es una función q se ejecuta (post, puts) cualquier peticion y preprara el objeto )
//urlencoded --> x-wwww-form-urlencoded
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

//Rutas de la app
server.app.use("/user", userRouters);

//Conectar BD
mongoose.connect("mongodb://127.0.0.1:27017/fotosgramTutu");


//Levantar Express
server.start(() => {
  console.log(`Servidor corriendo en puerto${server.port}`);
});
