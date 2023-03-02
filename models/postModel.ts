import { Schema, model, Document } from "mongoose";

const postSchema = new Schema({
  created: {
    type: Date,
  },
  mensaje: {
    type: String,
  },
  img: [
    {
      type: String,
    },
  ],
  coords: {
    type: String, //latitud y longitug para mapa
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "Debe existir una referencia al usuario"],
  },
});

//PAra que se cree la fecha de forma automantica en el posteo

postSchema.pre("save", function (next) {
  this.created = new Date();
  next();
});

export interface IPost extends Document {
  created: Date;
  mensaje: string;
  img: string[];
  coords: string;
  usuario: string;
}

export const Post = model<IPost>("Post", postSchema);
