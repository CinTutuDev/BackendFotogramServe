import { Router, Request, Response } from "express";

const userRouter = Router();

/* hacer petición(GET, PUT, POSt....) */

/* userRouter.get("/prueba", (rep: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "Tu petición ha salido bien!!!",
  });
});
 */

//Ruta que voy a llamar para insertar BD
userRouter.post("/create", (rep: Request, res: Response) => {

  


  res.json({
    ok: true,
    mensaje: "Tu petición ha salido bien!!!",
  });
});

export default userRouter;