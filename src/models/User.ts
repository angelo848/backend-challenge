import { model, Schema, Model } from 'mongoose'

import { IUser } from '../types'

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  recharges: [
    { type: Schema.Types.ObjectId, ref: 'Recharge' }
  ]
})

const User: Model<IUser> = model('User', UserSchema)

export default User