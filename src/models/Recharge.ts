import { model, Schema, Model, Document, Date } from 'mongoose'

interface IRecharge extends Document {
  rechargeStartTime: Date,
  rechargeEndTime: Date,
  stationId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
}

const RechargeSchema: Schema = new Schema({
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