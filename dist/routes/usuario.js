"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
/* hacer petición(GET, PUT, POSt....) */
/* userRouter.get("/prueba", (rep: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "Tu petición ha salido bien!!!",
  });
});
 */
//Ruta que voy a llamar para insertar BD
userRouter.post("/create", (rep, res) => {
    res.json({
        ok: true,
        mensaje: "Tu petición ha salido bien!!!",
    });
});
exports.default = userRouter;
