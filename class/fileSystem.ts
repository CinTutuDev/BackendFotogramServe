import { FileUp } from "../interfaces/fileUp";
import path from "path";
import fs from "fs";
// npm i uniqid
// npm i --save-dev @types/uniqid
import uniqid from 'uniqid';

export default class FileSystem {
  constructor() {}

  guardarImgTemporal(file: FileUp, userID: string) {
   //------------------------------------------------CREAR CARPETAS---------------------------------
    const path = this.crearCarpetaUser(userID);
  
    //-----------------------------------------------CREAR NOMBRE ARCH-------------------------------
    const nombreArch = this.generarNombreUnic(file.name);
    console.log(file.name);
    console.log(nombreArch);
   
  
  }

  /* el nombreOriginal viene del file */
  private generarNombreUnic( nombreOriginal: string ){
   //6.copy.jpg
   //separo por puntos para tener las 3 posiciones
   //necesito la ultima posicion
   const nombreArr = nombreOriginal.split('.');
   //aqui guardo la ultima pos
   const extension = nombreArr[nombreArr.length -1];
   console.log('la ultima posicion es: ' , extension);
   //importo  npm i --save-dev @types/uniqid 
   //npm i uniqid
   const idUnic = uniqid();
   
   return `${idUnic}.${extension}`;
  }

  private crearCarpetaUser(userID: string) {
    // con __dirname toda la estructura hasta la carpeta del proyecto para ello import--> path from 'path';
    //path--> BackendFotogramServe\uploads
    const pathUser = path.resolve(__dirname, "../uploads/", userID);
    /* La priemra carga va a la carpeta temp */
    const pathUserTemp = path.resolve(pathUser + "/temp");
    console.log("La path: ", pathUser);

    /* Para saber si exites una carpeta-->  import fs from 'fs';*/
    const existe = fs.existsSync(pathUser);
    if (!existe) {
      fs.mkdirSync(pathUser);
      fs.mkdirSync(pathUserTemp);
    }
    return pathUserTemp;
  }
}
