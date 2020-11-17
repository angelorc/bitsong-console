import { sleep } from '@/lib/utils'

export const state = () => ({
  loading: false,
  wallets: [],
  selectedWallet: null
})

export const getters = {
  loading: state => {
    return state.loading
  },
  mnemonic: state => {
    return state.selectedWallet === null ? '' : state.wallets[state.selectedWallet].mnemonic
  },
  address: state => {
    return state.selectedWallet === null ? '' : state.wallets[state.selectedWallet].address
  },
  privateKey: state => {
    return state.selectedWallet === null ? '' : state.wallets[state.selectedWallet].privateKey
  },
  password: state => {
    return state.selectedWallet === null ? '' : state.wallets[state.selectedWallet].password
  },
  isLoggedIn: state => {
    return state.selectedWallet === null ? false : true
  },
}

export const mutations = {
  toggleLoading: (state) => {
    state.loading = !state.loading
  },
  addWallet: (state, { mnemonic, privateKey, password, address }) => {
    state.wallets.push({
      mnemonic, privateKey, password, address
    })
  },
  delWallet: (state, index) => {
    state.wallets.pop(index)
  },
  connect: (state, index) => {
    state.selectedWallet = index
  },
  disconnect: (state, index) => {
    state.selectedWallet = null
  }
}

export const actions = {
  async createAccountWithMnemonic({
    commit, state
  }, password) {
    try {
      commit(`toggleLoading`)
      await sleep(200)

      const { address, mnemonic, privateKey } = this.$client.createAccountWithMneomnic()
      commit(`addWallet`, {
        address, mnemonic, privateKey, password
      })

      const i = state.wallets.findIndex(w => w.address === address)
      commit(`connect`, i)

      commit(`toggleLoading`)
    } catch (e) {
      commit(`toggleLoading`)
      console.error(e)
    }
  },
  async generateAndDownloadKeyStore({
    commit,
    getters
  }) {
    try {
      commit(`toggleLoading`)
      await sleep(200)

      this.$client.generateAndDownloadKeyStore(getters.privateKey, getters.password)

      commit(`toggleLoading`)
    } catch (e) {
      commit(`toggleLoading`)
      console.error(e)
    }
  },
  async recoverAccountFromPrivateKey({
    commit, state
  }, {
    privateKey, password
  }) {
    try {
      commit(`toggleLoading`)
      await sleep(200)

      const { address } = this.$client.recoverAccountFromPrivateKey(privateKey)
      commit(`addWallet`, {
        address, privateKey, password
      })

      const i = state.wallets.findIndex(w => w.address === address)
      commit(`connect`, i)

      commit(`toggleLoading`)

      return true
    } catch (e) {
      commit(`toggleLoading`)
      console.error(e)
      return false
    }
  },
  async recoverAccountFromMnemonic({
    commit, state
  }, {
    mnemonic, password
  }) {
    try {
      commit(`toggleLoading`)
      await sleep(200)

      const {
        privateKey,
        address
      } = this.$client.recoverAccountFromMnemonic(mnemonic)
      commit(`addWallet`, {
        mnemonic, address, privateKey, password
      })

      const i = state.wallets.findIndex(w => w.address === address)
      commit(`connect`, i)

      commit(`toggleLoading`)

      return true
    } catch (e) {
      commit(`toggleLoading`)
      console.error(e)
      return false
    }
  },
  async recoverAccountFromKeystore({
    commit, state
  }, {
    keystore,
    password
  }) {
    try {
      commit(`toggleLoading`)
      await sleep(200)

      const {
        privateKey,
        address
      } = this.$client.recoverAccountFromKeystore(keystore, password)
      commit(`addWallet`, {
        address, privateKey, password
      })

      const i = state.wallets.findIndex(w => w.address === address)
      commit(`connect`, i)

      commit(`toggleLoading`)

      return true
    } catch (e) {
      commit(`toggleLoading`)
      console.error(e)
      return false
    }
  },
  async disconnect({
    commit
  }) {
    try {
      commit(`disconnect`)
    } catch (e) {
      console.error(e)
    }
  },
}
