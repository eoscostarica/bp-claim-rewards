const eosUtil = require('./utils/eos.util')
const { eosConfig } = require('./config')

const bpAccount = eosConfig.bpAccount

const getProducer = async ({
  producer,
  table = 'producers',
  limit = 1
} = {}) => {
  return await eosUtil.getTableRows({
    code: 'eosio',
    scope: 'eosio',
    table,
    limit,
    lower_bound: producer,
    upper_bound: producer
  })
}
 
const claimLibreRewards = async() => {
  try {
    console.log("Checking if it's time to claim rewards:", bpAccount)

    const data = await getProducer({ producer: bpAccount, table: 'payments' })
    
    if(!data.rows.length) {
      console.log("Bp does not exist")
      return
    }

    const bpPayment = data.rows[0]

    console.log("BP Payment: ", bpPayment)

    if(!bpPayment.amount) {
      console.log("No founds to claim")
      return
    }

    console.log("Time to Claim Rewards!")

    const transact = await eosUtil
    .transact([
      {
        account: 'eosio',
        name: 'claimrewards',
        authorization: [
          { actor: bpAccount, permission: eosConfig.claimPerms }
        ],
        data: {
          owner: bpAccount
        }
      }
    ])
    .catch(er => console.log("Fail to claim the rewards: ", er.toString()))

    if (transact) console.log("Transaction trace: ", transact)

  } catch (error) {
    console.error(error)
  }
}

const claimRewards = async() => {
  try {
    console.log("Checking if it's time to claim rewards:", bpAccount)

    const data = await getProducer({ producer: bpAccount })
    
    if(!data.rows.length) {
      console.log("Bp does not exist")
      return
    }

    const bp = data.rows[0]

    console.log("BP: ", bp)

    const lastClaim = new Date(bp.last_claim_time)
    const now = new Date()
    const msBetweenDates = Math.abs(lastClaim.getTime() - now.getTime())
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000)

    if (hoursBetweenDates > 24) {
      console.log('Time to Claim Rewards!')

      const transact = await eosUtil
      .transact([
        {
          account: 'eosio',
          name: 'claimrewards',
          authorization: [
            { actor: bpAccount, permission: eosConfig.claimPerms }
          ],
          data: {
            owner: bpAccount
          }
        }
      ])
      .catch(er => console.log("Fail to claim the rewards: ", er.toString()))

      if (transact) console.log("Transaction trace: ", transact)
    }else {
      console.log(`The next claim is in ${hoursBetweenDates} hours`)
    }
  } catch (error) {
    console.error(error)
  }
}

async function init() {
  switch (eosConfig.network) {
    case "libre":
    case "libre-testnet":
      claimLibreRewards()
      break
    default:
      claimRewards()
  }
}

init()
