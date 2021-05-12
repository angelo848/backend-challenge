import User from '../../../models/User'

import { IUser } from "../../../types";

export default {
  Query: {
    user: (_: any, { id }: IUser) => User.findById(id),
  },
  Mutation: {
    createUser: (_: any, { data }: any) => User.create(data)
  }
}