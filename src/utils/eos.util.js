const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
const { fetch } = require('../mod.cjs')
const { TextEncoder, TextDecoder } = require('util')
const EosApi = require('eosjs-api')

const { eosConfig } = require('./../config')

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()
const rpc = new JsonRpc(eosConfig.endpoint, { fetch })
const eosApi = EosApi({
  httpEndpoint: eosConfig.endpoint,
  verbose: false,
  fetchConfiguration: {}
})

const getTableRows = options => eosApi.getTableRows({ json: true, ...options })

const transact = async actions => {
  try {
    const keys = [eosConfig.claimKey]

    const api = new Api({
      rpc,
      textDecoder,
      textEncoder,
      chainId: eosConfig.chainId,
      signatureProvider: new JsSignatureProvider(keys)
    })

    const transaction = await api.transact(
      {
        actions
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    )

    return transaction
  } catch (error) {
    throw new Error(
      error.message.replace(/assertion failure with message: /gi, '')
    )
  }
}

module.exports = {
  getTableRows,
  transact
}
