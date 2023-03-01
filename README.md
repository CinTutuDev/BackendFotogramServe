#👩‍💻 PrepararBackend
Instalación MongoDB y más

##🧲 URL para descargalo

```
https://www.mongodb.com/try/download/community
```
## Tutorial que seguí

```
https://www.youtube.com/watch?v=LibtQECAR1U&ab_channel=FacultadAutodidacta
```
## Poner la path en las variables en entorno: 
```
C:\Program Files\MongoDB\Server\6.0\bin
```
## Reiniciar terminal y poner: 
```
mongod
```
## Instalar Robo 3T

```
https://robomongo.org/
```
* Abrir lo 'Studio 3T'

Crear a new connection:<br>
 ✔Manuelly configure my connection setting + next <br>
 ✔Rellenar con nombre de la bd, server(localhost)y port(27017)

## Comienzo proyecto que es de node y para eso tiro este comando

* Abro terminal en el proyecto y tiro el comando:
```
npm init
```
* Le damos a enter hasta yes 
package name: (backendfotogramserve)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository: (https://github.com/CinTutuDev/BackendFotogram.git)
keywords:
author:
license: (ISC)
About to write to D:\ionic\BackendFotogramServe\package.json:
Is this OK? (yes) y
* con esto creo el package.json
* Creo un index.ts 
* Paso a terminal y si no tengo instalado control de versiones de TypeScrip 
```
npm install -g typescript
tsc -v
```
* Escribo a continuaciòn en el terminal:
```
tsc index.js
```
* Y se crera el .js
* Para ver el console.log('Hola Mundo');
 ```
node index.js
```
* Crear archivo compilaer de Ts
```
tsc --init
```
* Abromos el : tsconfig.json Y ponemos/descomentamos si no está 
 "outDir": "dist/",  
* Poner modo observador
```
 tsc -w
 ```
 
 ## Instalación de Nodemon de forma global
 
 ```
 npm install -g nodemon
 ``` 
 * Dentro del proyecto :
 ```
  nodemon dist
  ```
## Instalaciones necesarias
* Una a una:
```
npm install express<br>
npm install body-parser<br>
npm install cors<br>
npm install mongoose<br>
npm install express-fileupload<br>
npm install jsonwebtoken<br>
npm install bcrypt<br>
```
 * Ó de una vez
 ```
npm install express body-parser cors mongoose express-fileupload jsonwebtoken bcrypt
```
## Para que funcionen tengo que tener corriendo:
* En un terminal
```
tsc -w 
```
* Y en otro 
```
nodemon dist/
```
## Instalacion tipado
```
npm install @types/express --save-dev
```

##🧵 Creación de servicio REST

* 1º Creo carpeta de routes y archivo usuarios.ts
* 2º Realizo petición:
```
import { Router, Request, Response } from "express";

const userRouter = Router();

/* hacer petición(GET, PUT, POSt....) */

userRouter.get("/prueba", (rep: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "Tu petición ha salido bien!!!",
  });
});

export default userRouter;
``` 

