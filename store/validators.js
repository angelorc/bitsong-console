import {
  calculateVotingPower, pubkeyToAddress
} from '@/lib/utils'

export const state = () => ({
  validators: []
})

export const getters = {
  validators: (state, getters) => {
    try {
      let rank = 1

      return [...state.validators].sort((a, b) => {
        return b.tokens - a.tokens
      }).map(val => {
        return {
          ...val,
          rank: rank++,
          voting_power_percent: (Number(getters.total_power) > 0 ? calculateVotingPower(Number(val.tokens), Number(getters.total_power)) : 0),
          address: pubkeyToAddress(val.consensus_pubkey)
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
  total_active: state => {
    return state.validators.filter(v => v.status === 2).length
  },
  total_power: state => {
    let vals = state.validators.filter(v => v.status === 2)

    if (vals.length === 0) return 0

    return vals.reduce((a, b) => {
      const sum = Number(a) + Number(b.tokens)
      return sum
    }, 0)
  }
}

export const mutations = {
  setValidators: (state, vals) => {
    state.validators = vals
  }
}

export const actions = {
  async getAll({ commit }) {
    const bonded = await this.$btsg.getValidators()
    const unbonded = await this.$btsg.getValidators('unbonded')
    const unbonding = await this.$btsg.getValidators('unbonding')

    const validators = [
      ...bonded.result,
      ...unbonded.result,
      ...unbonding.result
    ]

    commit('setValidators', validators)
  }
}
