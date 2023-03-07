import { Router, Request, Response } from "express";
import { verificaToken } from "../middlewares/autentication";
import { Post } from "../models/postModel";
import { FileUp } from "../interfaces/fileUp";
import FileSystem from "../class/fileSystem";

const postRoutes = Router();
const fileSystem = new FileSystem();

//--------------------------CREACION DE UNA ENTRADA DE POSTEOS--------------------------------

postRoutes.post("/", [verificaToken], (req: any, res: Response) => {
  //en el body se obtiene la inf que se le pasa
  const body = req.body;
  body.usuario = req.usuario._id;

  //Array para guardar en la carpeta \dist\uploads\post
  //creo el metodo en class\fileSystem.ts
  const imagenes = fileSystem.imagenesDeTempHaciaPost( req.usuario._id );
  body.imgs = imagenes;

  //---------------Para CREAR/GRABAR en BD------------------

  Post.create(body)
    .then(async (postDB) => {
  
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

//--------------------------------------------------------POST PAGINADOS-------------------------------------------------
//con get peticion public
postRoutes.get("/", async (req: any, res: Response) => {
  //obtengo todos los registros y guardo en variable
  //Sacar todos reg de fomra descendente ---> const posts = await Post.find().sort({ _id: -1 }).exec();
  //que me regrese los ultimos 10 --> .limit(10)
  //Buscar paginas --> skip
  let pg = Number(req.query.pg) || 1; //si regresa NAN o null
  let skip = pg - 1;
  skip = skip * 10;

  const posts = await Post.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(10)
    .populate("usuario", "-password")
    .exec();

  res.json({
    ok: true,
    pg,
    posts,
  });
});

//--------------------------------------------------------SUBIR ARCHIVOS IMAGENES------------------------------

postRoutes.post("/upload", [verificaToken], async (req: any, res: Response) => {
  if ( !req.files ) {
    return res.status(400).json({
        ok: false,
        mensaje: 'No se subió ningun archivo'
    });
}

const file: FileUp = req.files.image;

if ( !file ) {
    return res.status(400).json({
        ok: false,
        mensaje: 'No se subió ningun archivo - image'
    });
}

if ( !file.mimetype.includes('image') ) {
    return res.status(400).json({
        ok: false,
        mensaje: 'Lo que subió no es una imagen'
    }); 
}

await fileSystem.guardarImagenTemporal( file, req.usuario._id );

res.json({
    ok: true,
    file: file.mimetype
});
});




postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {

  const userId = req.params.userid;
  const img    = req.params.img;


  const pathFoto = fileSystem.getFotoUrl( userId, img );


  res.sendFile(pathFoto);
 /*  const pathFoto = fileSystem.getFotoUrl( userId, img );

  res.sendFile( pathFoto ); */

});

export default postRoutes;
