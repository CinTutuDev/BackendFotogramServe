import Server from "./class/server";
import userRouter from "./routes/usuario";

const server = new Server();

//Rutas de la app
server.app.use("/user", userRouter);

server.start(() => {
  console.log(`Servidor corriendo en puerto${server.port}`);
});
