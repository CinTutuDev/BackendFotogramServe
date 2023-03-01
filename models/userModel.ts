import { Schema, model, Document } from "mongoose";

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

interface IUser extends Document {
  nombre: string;
  avatar: string;
  email: string;
  password: string;
}

//Modelo de usuario UserModel !!!!
export const UserModel = model<IUser>("User", userSchema);
