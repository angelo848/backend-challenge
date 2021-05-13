import Station from '../models/Station'

interface IDataStation {
  planetName: string
  fuelStation: number
}

import { IDataSources } from "../types";

export const findAllStations = () => Station.find()

export const installStation = async (_: any, { stationData }: { stationData: IDataStation }, { dataSources }: IDataSources) => {
  const planet = await dataSources.nasaApi.getExoplanets('pl_name', `pl_name+=+'${stationData.planetName}'`)
  if (planet.length === 0) {
    return new Error('No planet found in nasa api')
  }

  const station = await Station.create({
    exoplanet: stationData.planetName,
    fuel: stationData.fuelStation
  })

  return station
}