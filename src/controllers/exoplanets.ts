import NasaApi from "../graphql/datasources/nasaSource";

interface IDataSources {
  dataSources: {
    nasaApi: NasaApi
  }
}

export const suitablePlanets = async (_: any, { select }: { select: string }, { dataSources }: IDataSources) => {
  return dataSources.nasaApi.getExoplanets(select)
}