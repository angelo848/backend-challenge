import { model, Schema, Model } from 'mongoose'

import { IRecharge } from "../types";

const RechargeSchema: Schema = new Schema({
  rechargeValue: {
    type: Number,
    required: true
  },
  rechargeStartTime: {
    type: Date,
    required: true
  },
  rechargeEndTime: {
    type: Date,
    required: true
  },
  stationId: {
    type: Schema.Types.ObjectId,
    ref: 'Station',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Recharge: Model<IRecharge> = model('Recharge', RechargeSchema)

export default Recharge