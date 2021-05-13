import { listRecharges, rechargeUser } from "../../../controllers/recharge";

export default {
  Query: {
    recharges: listRecharges
  },
  Mutation: {
    recharge: rechargeUser
  },
}