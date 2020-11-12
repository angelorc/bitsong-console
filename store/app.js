export const state = () => ({
  chain_id: process.env.CHAIN_ID,
  micro_stake_denom: process.env.MICROSTAKEDENOM,
  stake_denom: process.env.STAKEDENOM,
  dark_theme: false,
  gas_price: process.env.DEFAULT_GAS_PRICE,
  gas_limit: process.env.DEFAULT_GAS_LIMIT,
  address_prefix: process.env.ADDRESS_PREFIX,
  address_length: process.env.ADDRESS_LENGTH,
  decimals: process.env.DECIMALS
})

export const getters = {
  chain_id: state => {
    return state.chain_id.toLowerCase()
  },
  stake_denom: state => {
    return state.stake_denom.toUpperCase()
  },
  micro_stake_denom: state => {
    return state.micro_stake_denom.toUpperCase()
  },
  gas_price: state => {
    return state.gas_price
  },
  gas_limit: state => {
    return state.gas_limit
  },
  address_prefix: state => {
    return `${state.address_prefix}`
  },
  address_length: state => {
    return state.address_length
  },
  decimals: state => {
    return state.decimals
  }
}

export const mutations = {
  SET_DARK_THEME: (state, payload) => {
    state.dark_theme = payload
  },
}


export const actions = {
  toggleDarkTheme({ commit, state }) {
    commit('SET_DARK_THEME', !state.dark_theme)
  }
}
