import { ApolloServer } from "apollo-server";
import mongoose from 'mongoose'
import NasaAPI from "./graphql/datasources/nasaSource";


function startServer({ typeDefs, resolvers }) {
  mongoose.connect('mongodb://database:27017/voltbras', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const server = new ApolloServer({
    typeDefs, resolvers, dataSources: () => {
      return {
        nasaApi: new NasaAPI()
      }
    }
  })
  server.listen().then(({ url }) => console.log(`server started at ${url}`))
}

export default startServer