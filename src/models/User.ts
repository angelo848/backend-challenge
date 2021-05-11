import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  recharging: {
    type: Boolean,
    required: true
  },
})

export default mongoose.model('User', Schema)