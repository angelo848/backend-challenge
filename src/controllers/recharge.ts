import { Schema } from "mongoose"
import Recharge from "../models/Recharge"
import Station from "../models/Station"
import User from "../models/User"

interface IDataRecharge {
  rechargeValue: number,
  rechargeEndTime: string,
  stationId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
}

export const rechargeUser = async (_: any, { rechargeData }: { rechargeData: IDataRecharge }) => {
  const station = await Station.findById(rechargeData.stationId)

  if (!station) {
    return new Error('Unexistent station')
  }

  if (station.fuel < rechargeData.rechargeValue) {
    return new Error('Insuficient fuel in the station')
  }

  const user = await User.findById(rechargeData.userId)

  if (!user) {
    return new Error('Unexistent user')
  }

  if (Date.parse(rechargeData.rechargeEndTime) <= new Date().getTime()) {
    return new Error('Recharge end time it \'s minor than actual time')
  }

  const userIsRecharging = await Recharge.findOne({
    userId: rechargeData.userId,
    rechargeEndTime: { $gte: new Date() }
  })

  const stationIsRecharging = await Recharge.findOne({
    stationId: rechargeData.stationId,
    rechargeEndTime: { $gte: new Date() }
  })

  if (userIsRecharging) {
    return new Error('The selected user is already recharging')
  }

  if (stationIsRecharging) {
    return new Error('The selected station is already recharging')
  }

  const recharge = await Recharge.create({
    rechargeValue: rechargeData.rechargeValue,
    rechargeStartTime: new Date(),
    rechargeEndTime: rechargeData.rechargeEndTime,
    stationId: rechargeData.stationId,
    userId: rechargeData.userId
  })

  station.recharges.push(recharge)
  user.recharges.push(recharge)
  await station.save()
  await user.save()

  await station.update({
    fuel: station.fuel - rechargeData.rechargeValue
  })


  return recharge
}

export const listRecharges = async () => Recharge.find()
