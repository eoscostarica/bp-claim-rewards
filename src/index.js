const eosUtil = require('./utils/eos.util')
const { eosConfig } = require('./config')

const bpAccounts = [eosConfig.bpAccount]

async function init() {
  try {
    for (const account of bpAccounts) {
      console.log("Cheking if it's time to claim rewards:", account)

      const getProducers = async ({
        next_key: nextKey = null,
        limit = 100
      } = {}) => {
        return await eosUtil.getTableRows({
          code: 'eosio',
          scope: 'eosio',
          table: 'producers',
          limit,
          lower_bound: nextKey
        })
      }

      const getProducer = async () => {
        let nextKey = null

        while (true) {
          const producers = await getProducers({ next_key: nextKey })

          for (const producer of producers.rows) {
            if (!(producer.owner === account)) continue

            return producer
          }

          if (!producers.more) break

          nextKey = producers.next_key
        }
      }

      const bp = await getProducer()
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
                { actor: eosConfig.bpAccount, permission: eosConfig.claimPerms }
              ],
              data: {
                owner: account
              }
            }
          ])
          .catch(er => console.log(er.toString()))

        if (transact) console.log(transact)
      } else {
        console.log('Last claim is within 24 hours')
      }
    }
  } catch (error) {
    console.error(error)
  }
}
init()
