import { findAllStations, installStation } from "../../../controllers/station";

export default {
  Query: {
    stations: findAllStations,
  },
  Mutation: {
    installStation
  }
}