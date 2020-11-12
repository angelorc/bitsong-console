import Tendermint from '@/lib/tendermint'
import Api from '@/lib/api'
import Btsg from '@/lib/btsg'
import Bitsong from '@/lib/bitsong'

export default (ctx, inject) => {
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

  // ctx.app.store.dispatch(`app/startListening`)
  // ctx.app.store.dispatch(`consensus/subscribe`)
  // ctx.app.store.dispatch(`validators/getAll`)
}
