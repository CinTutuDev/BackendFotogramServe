import { Router, Request, Response } from "express";
import { IUsuario, Usuario } from "../models/userModel";
//Encriptado de contraseña
//instalar:
// npm install @types/bcrypt --save-dev
import bcrypt from "bcrypt";
import Token from "../class/token";
import { verificaToken, verificaToken2 } from "../middlewares/autentication";

const userRoutes = Router();

//-*-------------------------------------------------CREAR LOGIN-----------------------------
userRoutes.post("/login", (req: Request, res: Response) => {
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

//---------------------------------------------------CREAR USUARIO------------------------------
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

  //---------------Para GRABAR en BD---------------
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

//-------------------------------------------------------ACTUALIZAR USUARIOS------------------------------

userRoutes.post("/update", verificaToken, (req: any, res: Response) => {
  //Antes necesito verificar que el Token sea valido --> middlewares\autentication.ts
  //middlewares --> se ejecuta antes de la ruta ... esta

  const user = {
    nombre: req.body.nombre || req.usuario.nombre,
    email: req.body.email || req.usuario.email,
    avatar: req.body.avatar || req.usuario.avatar,
  };

  Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }).then(
    (userDB) => {
      if (!userDB) {
        return res.json({
          ok: false,
          mensaje: "usuario incorrecto",
        });
      }
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
    }
  );
});

export default userRoutes;
