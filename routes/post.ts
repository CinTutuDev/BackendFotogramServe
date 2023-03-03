import { Router, Request, Response } from "express";
import { verificaToken } from "../middlewares/autentication";
import { Post } from "../models/postModel";

const postRoutes = Router();

//--------------------------CREACION DE UNA ENTRADA DE POSTEOS--------------------------------

postRoutes.post("/", [verificaToken], (req: any, res: Response) => {
  //en el body se obtiene la inf que se le pasa
  const body = req.body;
  body.usuario = req.usuario._id;

  //---------------Para GRABAR en BD------------------

  Post.create(body)
    .then(async (postDB) => {
      //
      //Aparezca todo el objeto del usuario, para que no aparezca el pass cpn (-)
      await postDB.populate("usuario", "-password");

      res.json({
        ok: true,
        post: postDB,
      });
    })
    .catch((err) => {
      res.json({
        ok: false,
        mensaje: "Incorrecto",
        err,
      });
    });
});

export default postRoutes;
