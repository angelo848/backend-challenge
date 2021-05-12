import { findUser, createUser, findAllUsers } from "../../../controllers/user";

export default {
  Query: {
    user: findUser,
    users: findAllUsers
  },
  Mutation: {
    createUser
  }
}