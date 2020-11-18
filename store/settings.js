export const state = () => ({
  dark_theme: false
})

export const getters = {
  dark_theme: state => {
    return state.dark_theme
  }
}

export const mutations = {
  SET_DARK_THEME: (state, payload) => {
    state.dark_theme = payload
  }
}


export const actions = {
  toggleDarkTheme({ commit, state }) {
    commit('SET_DARK_THEME', Boolean(!state.dark_theme))
  }
}
