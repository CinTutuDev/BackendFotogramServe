import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';
//Creacion modelo Base Datos

const userSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  avatar: {
    type: String,
    default: "av-1.png",
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El email es necesario"],
  },
  password: {
    type: String,
    required: [true, "El pass es necesario"],
  },
});

userSchema.method('compararPassword', function( password: string = ''): boolean {

  if (  bcrypt.compareSync( password, this.password ) ) {
      return true;
  } else {
      return false;
  }

});


export interface IUsuario extends Document {
  nombre: string;
  avatar: string;
  email: string;
  password: string;

  compararPassword(password: string): boolean;
}

//Modelo de usuario UserModel !!!!
export const Usuario = model<IUsuario>("Usuario", userSchema);
