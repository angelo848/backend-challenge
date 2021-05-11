import { ApolloServer, Config } from "apollo-server";
import mongoose from 'mongoose'

function startServer({ typeDefs, resolvers }: { typeDefs: any, resolvers: any }) {
  mongoose.connect('mongodb://database:27017/voltbras', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const server = new ApolloServer({ typeDefs, resolvers })
  server.listen().then(({ url }) => console.log(`server started at ${url}`))
}

export default startServer