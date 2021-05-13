import mongoose from "mongoose";
import Station from "../../models/Station";
import { IStation } from "../../types";

export const station: IStation = new Station({
  _id: mongoose.Types.ObjectId(),
  exoplanet: 'kepler',
  fuel: 100,
  recharges: []
})