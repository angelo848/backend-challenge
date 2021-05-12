import NasaApi from "../../datasources/nasaSource";

interface IDataSources {
  dataSources: {
    nasaApi: NasaApi
  }
}

export default {
  Query: {
    suitablePlanets: async (_: any, { select }: { select: string }, { dataSources }: IDataSources) => {
      return dataSources.nasaApi.getExoplanets(select)
    }
  },
}