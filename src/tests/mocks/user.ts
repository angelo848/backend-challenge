import mongoose from "mongoose";
import User from "../../models/User";
import { IUser } from "../../types";

export const user: IUser = new User({
  _id: mongoose.Types.ObjectId(),
  name: 'John Doe',
  email: 'john_doe@gmail.com',
  password: '123456',
  recharges: []
})