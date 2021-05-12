import { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId,
  name: string,
  email: string,
  password: string
}

export interface IStation extends Document {
  _id: Schema.Types.ObjectId,
  exoplanet: string,
  location: string
}