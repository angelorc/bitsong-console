export const state = () => ({
  chain_id: process.env.CHAIN_ID,
  micro_stake_denom: process.env.MICROSTAKEDENOM,
  stake_denom: process.env.STAKEDENOM,
  gas_price: process.env.DEFAULT_GAS_PRICE, // TODO: try long response
  gas_limit: process.env.DEFAULT_GAS_LIMIT,
  address_prefix: process.env.ADDRESS_PREFIX,
  address_length: process.env.ADDRESS_LENGTH,
  address_start_regex: process.env.ADDRESS_START_REGEX,
  decimals: process.env.DECIMALS,
  explorer_url: process.env.EXPLORER_URL,
  dark_theme: false,
  sidebar: false
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
  address_start_regex: state => {
    return state.address_start_regex
  },
  decimals: state => {
    return state.decimals
  },
  sidebar: state => {
    return state.sidebar
  }
}

export const mutations = {
  SET_DARK_THEME: (state, payload) => {
    state.dark_theme = payload
  },
  SET_SIDEBAR: (state, payload) => {
    state.sidebar = payload
  },
}


export const actions = {
  toggleDarkTheme({ commit, state }) {
    commit('SET_DARK_THEME', !state.dark_theme)
  }
}
