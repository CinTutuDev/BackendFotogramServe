import { Router, Request, Response } from "express";
import { Usuario } from "../models/userModel";
//Encriptado de contraseña
//instalar:
// npm install @types/bcrypt --save-dev
import bcrypt from 'bcrypt';

const userRouters = Router();

/* hacer petición(GET, PUT, POSt....) */

/* userRouter.get("/prueba", (rep: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "Tu petición ha salido bien!!!",
  });
});
 */

//Ruta que voy a llamar para insertar BD
userRouters.post('/create', (req: Request, res: Response) => {
  //req es la respuesta al posteo y el body es del bodyParse
  //Info basic para inserción en mi bd
  const user = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    avatar: req.body.avatar,
  };

  //Para GRABAR en BD
  // 1ºLlamo a mi modelo de usuario del userModel.ts:
  //luego lo pruebo en Postman

  Usuario.create(user)
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

export default userRouters;
