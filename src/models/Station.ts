import { model, Schema, Model, Document } from 'mongoose'

import { IStation } from "../types";

const StationSchema: Schema = new Schema({
  exoplanet: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
})

const Station: Model<IStation> = model('Station', StationSchema)

export default Station