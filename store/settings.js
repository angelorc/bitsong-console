export const state = () => ({
  dark_theme: false,
  version: '0.0.0'
})

export const getters = {
  dark_theme: state => {
    return state.dark_theme
  },
  version: state => {
    return state.version
  }
}

export const mutations = {
  SET_DARK_THEME: (state, payload) => {
    state.dark_theme = payload
  },
  SET_VERSION: (state, payload) => {
    state.version = payload
  },
}


export const actions = {
  toggleDarkTheme({ commit, state }) {
    commit('SET_DARK_THEME', Boolean(!state.dark_theme))
  }
}
