import NasaApi from "../graphql/datasources/nasaSource";

import { IDataSources } from "../types";

export const suitablePlanets = async (_: any, { select, where }: { select: string, where: string }, { dataSources }: IDataSources) => {
  return dataSources.nasaApi.getExoplanets(select, where)
}