export const state = () => ({
  subscriptions: [],
  height: 0,
  proposer: '-',
  round: 0,
  step: '-',
  signatures: 0
})

export const getters = {
  height: state => {
    return state.height
  },
  proposer: state => {
    return state.proposer
  },
  round: state => {
    return state.round
  },
  step: state => {
    return state.step
  },
  signatures: state => {
    return state.signatures
  },
  subscriptions: state => {
    return state.subscriptions
  }
}

export const mutations = {
  setRound: (state, payload) => {
    state.height = payload.height
    state.proposer = payload.proposer.address
    state.round = payload.round
    state.step = payload.step
  },
  resetSignatures: (state) => {
    state.signatures = 0
  },
  incrementSignatures: (state) => {
    state.signatures++
  },
  addSubscription: (state, payload) => {
    state.subscriptions.push(payload)
  },
  resetState: (state) => {
    state.subscriptions = []
    state.height = 0
    state.proposer = '-'
    state.round = 0
    state.step = '-'
    state.signatures = 0
  }
}


export const actions = {
  async subscribe({ commit }) {
    const round_id = await this.$tm.subscribe(
      {
        query: `tm.event = 'NewRound'`,
      },
      async (response) => {
        commit('resetSignatures')
        commit('setRound', response.data.value)
      }
    )

    commit('addSubscription', round_id)

    const vote_id = await this.$tm.subscribe(
      {
        query: `tm.event = 'Vote'`,
      },
      async (response) => {
        if (response.data.value.Vote.type === 2) {
          commit('incrementSignatures')
        }
      }
    )

    commit('addSubscription', vote_id)
  },
  async unsubscribe({ commit, getters }) {
    for (let i = 0; i < getters.subscriptions.length; i++) {
      this.$tm.unsubscribe(getters.subscriptions[i])
    }

    commit('resetState')
  }
}
