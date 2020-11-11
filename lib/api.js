import fetch from "node-fetch"

class Api {
  constructor(url) {
    this.url = url
    this.limit = 25
  }

  getLatestBlocks() {
    return fetch(`${this.url}/blocks?offset=0&limit=25`).then(response => response.json())
  }

  getLatestTxs() {
    return fetch(`${this.url}/transactions?offset=0&limit=25`).then(response => response.json())
  }

  getBlocks(offset = 0, limit = 25) {
    return fetch(`${this.url}/blocks?offset=${offset}&limit=${limit}`).then(response => response.json())
  }

  getBlock(height) {
    return fetch(`${this.url}/blocks/${height}`).then(response => response.json()).then(response => response.data)
  }

  getTransactions(account = null, height = null, offset = 0, limit = 25) {
    let url = `${this.url}/transactions?offset=${offset}&limit=${limit}`

    if (account !== null) {
      url = `${url}&account=${account}`
    }

    if (height !== null) {
      url = `${url}&height=${height}`
    }

    return fetch(url).then(response => response.json())
  }

  getTransactionCount() {
    return fetch(`${this.url}/transactions/count`).then(response => response.json())
  }

  getTransaction(hash) {
    return fetch(`${this.url}/transactions/${hash}`).then(response => response.json())
  }

  getTransactionsByHeight(height) {
    return fetch(`${this.url}/transactions?height=${height}`).then(response => response.json())
  }

  getValidator(valoper) {
    return fetch(`${this.url}/validators/${valoper}`).then(response =>
      response.json()
    ).then(response =>
      response.data
    )
  }

  getValidatorDelegatorReward(del_addr) {
    return fetch(`${this.url}/validators/${del_addr}/rewards`).then(response =>
      response.json()
    ).then(response =>
      response.data
    )
  }

  getProposedBlocks(valoper) {
    return fetch(`${this.url}/validators/${valoper}/proposed_blocks`).then(response =>
      response.json()
    )
  }

  getMissedBlocks(valoper) {
    return fetch(`${this.url}/validators/${valoper}/missed_blocks`).then(response =>
      response.json()
    )
  }

  getUptime(valoper, start, end, with_blocks = false) {
    return fetch(`${this.url}/validators/${valoper}/uptime?start=${start}&end=${end}&with_blocks=${with_blocks}`).then(response =>
      response.json()
    )
  }
}

export default Api
