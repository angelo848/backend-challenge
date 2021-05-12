import User from "../models/User"

import { IUser } from "../types";

export const findUser = (_: any, { id }: { id: string }) => User.findById(id)

export const createUser = (_: any, { userData }: { userData: IUser }) => User.create(userData)

export const findAllUsers = () => User.find()