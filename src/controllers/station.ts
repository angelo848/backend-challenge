import Station from '../models/Station'

interface IDataStation {
  planetName: string
  fuelStation: number
}

export const findAllStations = () => Station.find()

export const installStation = (_: any, data: IDataStation) => {
  console.log(data.fuelStation)
  console.log(data.planetName)

  return 'Hello world'
}