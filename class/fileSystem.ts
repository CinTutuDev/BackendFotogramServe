import { FileUp } from "../interfaces/fileUp";
import path from "path";
import fs from "fs";
// npm i uniqid
// npm i --save-dev @types/uniqid
import uniqid from "uniqid";

export default class FileSystem {
  constructor() {}

  guardarImagenTemporal(file: FileUp, userID: string) {
    return new Promise<void>((resolve, reject) => {
      //------------------------------------------------CREAR CARPETAS---------------------------------
      const path = this.crearCarpetaUser(userID);

      //-----------------------------------------------CREAR NOMBRE ARCH-------------------------------
      const nombreArch = this.generarNombreUnic(file.name);
      /*  console.log(file.name);
    console.log(nombreArch); */

      //----------------------------------------------MOVER DEL TEMP A CARPETA DE DIST/TEMP------------

      file.mv(`${path}/${nombreArch}`, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /* el nombreOriginal viene del file */
  private generarNombreUnic(nombreOriginal: string) {
    //6.copy.jpg
    //separo por puntos para tener las 3 posiciones
    //necesito la ultima posicion
    const nombreArr = nombreOriginal.split('.');
    //aqui guardo la ultima pos
    const extension = nombreArr[ nombreArr.length - 1 ];
   /*  console.log("la ultima posicion es: ", extension); */
    //importo  npm i --save-dev @types/uniqid
    //npm i uniqid
    const idUnico = uniqid();

    return `${ idUnico }.${ extension }`;
  }

  private crearCarpetaUser(userId: string) {
    const pathUser = path.resolve(  __dirname, '../uploads/', userId );
    const pathUserTemp = pathUser + '/temp';
    // console.log(pathUser);

    const existe = fs.existsSync( pathUser );

    if ( !existe ) {
        fs.mkdirSync( pathUser );
        fs.mkdirSync( pathUserTemp );
    }

    return pathUserTemp;
  }

  //-----------------------------------------METODO MOVER IMG DE TEMP A POSTS------------------------------

  imagenesDeTempHaciaPost(userId: string) {
    
    const pathTemp = path.resolve(  __dirname, '../uploads/', userId, 'temp' );
    const pathPost = path.resolve(  __dirname, '../uploads/', userId, 'posts' );

    if ( !fs.existsSync( pathTemp ) ) {
        return [];
    }

    if ( !fs.existsSync( pathPost ) ) {
        fs.mkdirSync( pathPost );
    }

    const imagenesTemp = this.obtenerImagenesEnTemp( userId );

    imagenesTemp.forEach( imagen => {
        fs.renameSync( `${ pathTemp }/${ imagen }`, `${ pathPost }/${ imagen }` )
    });

    return imagenesTemp;
  }

  private obtenerImagenesEnTemp( userId: string ) {

    const pathTemp = path.resolve(  __dirname, '../uploads/', userId, 'temp' );

    return fs.readdirSync( pathTemp ) || [];

}


getFotoUrl( userId: string, img: string ) {

  // Path POSTs
  const pathFoto = path.resolve( __dirname, '../uploads', userId, 'posts', img );


  // Si la imagen existe
  const existe = fs.existsSync( pathFoto );
  if ( !existe ) {
      return path.resolve( __dirname, '../assets/400x250.jpg' );
  }


  return pathFoto;

}
}
