import { model, Schema, Model } from 'mongoose'

import { IStation } from "../types";

const StationSchema: Schema = new Schema({
  exoplanet: {
    type: String,
    required: true
  },
  fuel: {
    type: Number,
    required: true
  },
  recharges: [
    { type: Schema.Types.ObjectId, ref: 'Recharge' }
  ]
})

const Station: Model<IStation> = model('Station', StationSchema)

export default Station