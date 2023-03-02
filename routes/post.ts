import { Router, Request, Response } from "express";
import { verificaToken } from "../middlewares/autentication";

const postRoutes = Router();

//--------------------------CREACION DE UNA ENTRADA DE POSTEOS--------------------------------

postRoutes.post("/", [verificaToken], (req: any, res: Response) => {
  res.json({
    ok: true,
  });
});

export default postRoutes;
