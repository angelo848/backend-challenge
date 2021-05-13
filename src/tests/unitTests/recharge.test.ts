const { describe, it, before, afterEach } = require('mocha')
import { createSandbox, SinonSandbox, fake } from "sinon";
import { expect } from "chai";

import { rechargeUser } from "../../controllers/recharge";
import Station from '../../models/Station';
import { IDataRecharge } from '../../types';
import mongoose from 'mongoose';
import Recharge from '../../models/Recharge';
import { station } from "../mocks/station";
import User from "../../models/User";
import { user } from "../mocks/user";
import { recharge } from "../mocks/recharge";

describe('#Recharge Controller', () => {
  let sandbox: SinonSandbox

  before(() => {
    sandbox = createSandbox()

  })

  afterEach(() => {
    sandbox.restore()

  })

  describe('rechargeUser', () => {
    const model = new Recharge({
      _id: mongoose.Types.ObjectId()
    })

    const rechargeData: IDataRecharge = {
      rechargeEndTime: '2021-05-15',
      rechargeValue: 20,
      stationId: model.id,
      userId: model.id
    }

    it('should return error when not found station from db', async () => {
      sandbox.stub(Station, 'findById')
        .resolves(null)

      const result = await rechargeUser({}, { rechargeData })
      const expectedResult = { error: 'Unexistent station' }
      expect(result).to.be.deep.equal(expectedResult)
    })

    it('should return error when station has insuficient fuel', async () => {
      const stationWithoutFuel = Object.assign({}, station) // passando apenas os valores do objeto ao invés da referência do objeto
      stationWithoutFuel.fuel = 10

      sandbox.stub(Station, 'findById')
        .resolves(stationWithoutFuel)

      const result = await rechargeUser({}, { rechargeData })
      const expectedResult = { error: 'Insuficient fuel in the station' }

      expect(result).to.be.deep.equal(expectedResult)
    })

    it('should return error when not found user', async () => {
      sandbox.stub(Station, 'findById')
        .resolves(station)
      sandbox.stub(User, 'findById')
        .resolves(null)

      const result = await rechargeUser({}, { rechargeData })
      const expectedResult = { error: 'Unexistent user' }

      expect(result).to.be.deep.equal(expectedResult)
    })

    it('should return error when rechargeEndTime it\'s minor than actual time', async () => {
      sandbox.stub(Station, 'findById')
        .resolves(station)
      sandbox.stub(User, 'findById')
        .resolves(user)

      const now = new Date(2022, 10, 5)
      sandbox.useFakeTimers(now)

      const result = await rechargeUser({}, { rechargeData })
      const expectedResult = { error: 'Recharge end time it \'s minor than actual time' }

      expect(result).to.be.deep.equal(expectedResult)
    })

    it('should return error when selected user has a recharge in progress', async () => {
      sandbox.stub(Station, 'findById')
        .resolves(station)
      sandbox.stub(User, 'findById')
        .resolves(user)

      const progressingUserRecharge = Object.assign({}, recharge)
      sandbox.stub(Recharge, 'findOne')
        .resolves(progressingUserRecharge)

      const result = await rechargeUser({}, { rechargeData })
      const expectedResult = { error: 'The selected user is already recharging' }

      expect(result).to.be.deep.equal(expectedResult)
    })

    it('should return error when selected station has a recharge in progress', async () => {
      sandbox.stub(Station, 'findById')
        .resolves(station)
      sandbox.stub(User, 'findById')
        .resolves(user)

      const progressingStationRecharge = Object.assign({}, recharge)
      const rechargeStub = sandbox.stub(Recharge, 'findOne')
      rechargeStub
        .onCall(0).resolves(null)
        .onCall(1).resolves(progressingStationRecharge)

      const result = await rechargeUser({}, { rechargeData })
      const expectedResult = { error: 'The selected station is already recharging' }

      expect(result).to.be.deep.equal(expectedResult)
    })

    it('should return make a recharge and return it', async () => {
      sandbox.stub(Station, 'findById')
        .resolves(station)
      sandbox.stub(User, 'findById')
        .resolves(user)

      sandbox.stub(Recharge, 'findOne')
        .resolves(null)

      sandbox.stub(Recharge, 'create')
        .callsFake(() => recharge)

      sandbox.stub(user, 'save')
        .callsFake(() => true)

      sandbox.stub(station, 'save')
        .callsFake(() => true)

      sandbox.stub(station, 'update')
        .callsFake(fake())

      const result = await rechargeUser({}, { rechargeData })
      const expectedResult = recharge

      expect(result).to.be.deep.equal(expectedResult)
    })
  })
})