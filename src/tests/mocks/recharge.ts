import mongoose from "mongoose";
import Recharge from "../../models/Recharge";
import { IRecharge } from "../../types";

export const recharge: IRecharge = new Recharge({
  _id: mongoose.Types.ObjectId(),
  rechargeValue: 20,
  rechargeStartTime: new Date('2021-05-10'),
  rechargeEndTime: new Date('2021-05-11'),
  stationId: mongoose.Types.ObjectId(),
  userId: mongoose.Types.ObjectId()
})