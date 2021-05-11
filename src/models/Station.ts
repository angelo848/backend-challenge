import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  exoplanet: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
})

export default mongoose.model('Station', Schema)