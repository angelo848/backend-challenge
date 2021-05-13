import assert from "assert";
import { describe, it, before, afterEach } from 'mocha'
import { createSandbox, SinonSandbox } from "sinon";
import { expect } from "chai";

import { rechargeUser } from "../../src/controllers/recharge";
import Station from '../../src/models/Station';
import { IDataRecharge, IRecharge } from '../../src/types';
import mongoose from 'mongoose';
import Recharge from '../../src/models/Recharge';

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
      rechargeEndTime: '2021-15-05',
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
  })
})