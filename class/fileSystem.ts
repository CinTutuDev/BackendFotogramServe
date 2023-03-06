import { FileUp } from "../interfaces/fileUp";
import path from "path";
import fs from "fs";

export default class FileSystem {
  constructor() {}

  guardarImgTemporal(fiel: FileUp, userID: string) {
    const path = this.crearCarpetaUser(userID);
  }

  crearCarpetaUser(userID: string) {
    // con __dirname toda la estructura hasta la carpeta del proyecto para ello import--> path from 'path';
    //path--> BackendFotogramServe\uploads
    const pathUser = path.resolve(__dirname, "../uploads/", userID);
    /* La priemra carga va a la carpeta temp */
    const pathUserTem = pathUser + "/temp";
    console.log("La path: ", pathUser);

    /* Para saber si exites una carpeta-->  import fs from 'fs';*/
    const existe = fs.existsSync(pathUser);
    if (!existe) {
      fs.mkdirSync(pathUser);
      fs.mkdirSync(pathUserTem);
    }
    return pathUserTem;
  }
}
