import { ApolloServer } from "apollo-server";
import mongoose from 'mongoose'

export interface GraphqlConfig {
  typeDefs: any,
  resolvers: any
}

function startServer({ typeDefs, resolvers }: GraphqlConfig) {
  mongoose.connect('mongodb://database:27017/voltbras', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const server = new ApolloServer({ typeDefs, resolvers })
  server.listen().then(({ url }) => console.log(`server started at ${url}`))
}

export default startServer