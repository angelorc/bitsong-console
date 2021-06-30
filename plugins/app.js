// import Tendermint from '@/lib/tendermint'
import Api from '@/lib/api'
import Btsg from '@/lib/btsg'
import Bitsong from '@/lib/bitsong'

import { BitSongClient } from "@bitsongofficial/js-sdk"

import { StargateClient } from "@cosmjs/stargate"

export default async (ctx, inject) => {
  // const tm = new Tendermint(process.env.CHAIN_ID, process.env.SOCKET)
  // inject('tm', tm)
  // ctx.$tm = tm

  const bitsong = new Bitsong()
  inject('bitsong', bitsong)
  ctx.$bitsong = bitsong

  const btsg = new Btsg(process.env.LCD)
  inject('btsg', btsg)
  ctx.$btsg = btsg

  const api = new Api(process.env.API)
  inject('api', api)
  ctx.$api = api

  // Init Bitsong Client
  // const client = new BitSongClient(
  //   process.env.LCD,
  //   process.env.ADDRESS_PREFIX,
  //   process.env.HD_PATH
  // )
  const client = await StargateClient.connect(process.env.RPC)
  inject('client', client)
  ctx.$client = client

  // set mode to block
  //client.setMode("block")

  // init chain
  //await client.initChain()

  // set account
  if (ctx.app.store.getters['wallet/address'] !== null) {
    try {
      //await client.setAccountInfo(ctx.app.store.getters['wallet/privateKey'])
    } catch (e) {
      console.error(e)
    }
  }

  // ctx.app.store.dispatch(`app/startListening`)
  // ctx.app.store.dispatch(`consensus/subscribe`)
  // ctx.app.store.dispatch(`validators/getAll`)
}
