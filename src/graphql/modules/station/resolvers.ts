import Station from '../../../models/Station'

import { IStation } from "../../../types";

export default {
  Query: {
    stations: () => Station.find(),
  },
  Mutation: {
    installStation: (_: any, { planetId }: { planetId: string }) => console.log(planetId)
  }
}