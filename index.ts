import Server from "./class/server";
import userRouter from "./routes/usuario";
//mongosee es para conectar BD
import mongoose from 'mongoose';

const server = new Server();

//Rutas de la app
server.app.use("/user", userRouter);

//Conectar BD
mongoose.connect('mongodb://127.0.0.1:27017/fotosgram');

//Levantar Express
server.start(() => {
  console.log(`Servidor corriendo en puerto${server.port}`);
});
