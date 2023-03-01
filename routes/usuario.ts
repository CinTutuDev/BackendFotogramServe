import { Router, Request, Response } from "express";
import { IUsuario, Usuario } from "../models/userModel";
//Encriptado de contraseña
//instalar:
// npm install @types/bcrypt --save-dev
import bcrypt from "bcrypt";
import Token from "../class/token";

const userRoutes = Router();

//CREAR LOGIN
userRoutes.post("/login", (req: Request, res: Response)  => {
  const body = req.body;

  Usuario.findOne({ email: body.email }).then((user) => {
    if (!user) {
      res.json({ ok: false, message: "User or password incorrect" });
    } else {
      if (!bcrypt.compareSync(body.password, user.password)) {
        res.json({ ok: false, message: "User or password incorrect" });
      } else {
        const tokenUser = Token.getJwtToken({
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

//CREAR USUARIO
//Ruta que voy a llamar para insertar BD
userRoutes.post("/create", (req: Request, res: Response) => {
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
      const tokenUser = Token.getJwtToken({
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

export default userRoutes;
