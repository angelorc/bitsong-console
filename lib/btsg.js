import fetch from "node-fetch"
import axios from 'axios'

class Btsg {
  constructor(url) {
    this.url = url
    this.rpc = axios.create({
      baseURL: '/rpc/'
    })
  }

  getAccount(address) {
    return fetch(`${this.url}/auth/accounts/${address}`).then(response =>
      response.json()
    ).then(response =>
      response.result
    )
  }

  getDelegatorRewards(address) {
    return fetch(`${this.url}/distribution/delegators/${address}/rewards`).then(response =>
      response.json()
    ).then(response =>
      response.result
    )
  }

  getUnbondingDelegations(address) {
    return fetch(`${this.url}/staking/delegators/${address}/unbonding_delegations`).then(response =>
      response.json()
    ).then(response =>
      response.result
    )
  }

  getDelegations(address) {
    return fetch(`${this.url}/staking/delegators/${address}/delegations`).then(response =>
      response.json()
    ).then(response =>
      response.result
    )
  }

  getTotalSupply() {
    return fetch(`${this.url}/supply/total`).then(response =>
      response.json()
    )
  }

  getCommunityPool() {
    return fetch(`${this.url}/distribution/community_pool`).then(response =>
      response.json()
    )
  }

  getInflation() {
    return fetch(`${this.url}/minting/inflation`).then(response =>
      response.json()
    )
  }

  getBlock(block) {
    return fetch(`${this.url}/blocks/${block}`).then(response =>
      response.json()
    )
  }

  getValidators(status = 'bonded') {
    return fetch(`${this.url}/staking/validators?status=${status}`).then(response =>
      response.json()
    )
  }

  getValidator(valoper) {
    return fetch(`${this.url}/staking/validators/${valoper}`).then(response =>
      response.json()
    )
  }

  getValidatorDelegations(valoper) {
    return fetch(`${this.url}/staking/validators/${valoper}/delegations`).then(response =>
      response.json()
    )
  }

  getValidatorUnbondings(valoper) {
    return fetch(`${this.url}/staking/validators/${valoper}/unbonding_delegations`).then(response =>
      response.json()
    ).then(response =>
      response.result
    )
  }

  async getVotingPower() {
    const vals = await this.rpc.get(`validators`)
    // return  .then(response => {
    //   let vals = response.json()
    //   vals = vals.result.validators

    //   return vals.reduce((a, b) => Number(a) + Number(b), 0)
    // }
    // )
  }
}

export default Btsg
