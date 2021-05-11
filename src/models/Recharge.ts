import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  rechargeStartTime: {
    type: Date,
    required: true
  },
  rechargeEndTime: {
    type: Date,
    required: true
  },
  stationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

export default mongoose.model('Recharge', Schema)