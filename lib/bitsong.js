import fetch from "node-fetch"
import bip39 from "bip39"
import bip32 from "bip32"
import bech32 from "bech32"
import secp256k1 from "secp256k1"
import crypto from "crypto"
import bitcoinjs from "bitcoinjs-lib"
import createHash from "create-hash"
import CryptoJS from "crypto-js"
import BigNumber from 'bignumber.js'

const entropySalt = "!!!___!!!YOU COULD REPLACE THIS WITH ANYTHING!!!___!!!"
const keySize = 256
const iterations = 100

function sortObject(obj) {
  if (obj === null) return null
  if (typeof obj !== "object") return obj
  if (Array.isArray(obj)) return obj.map(sortObject)
  const sortedKeys = Object.keys(obj).sort()
  const result = {}
  sortedKeys.forEach(key => {
    result[key] = sortObject(obj[key])
  })
  return result
}

/*const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}*/

class Bitsong {
  constructor() {
    this.url = process.env.LCD
    this.chainId = process.env.CHAIN_ID
    this.path = "m/44'/118'/0'/0/0"
    this.bech32MainPrefix = process.env.ADDRESS_PREFIX

    if (!this.url) {
      throw new Error("url object was not set or invalid")
    }
    if (!this.chainId) {
      throw new Error("chainId object was not set or invalid")
    }
  }

  sha2(data) {
    return createHash("sha256")
      .update(data)
      .digest()
  }

  xor(a, b) {
    if (!Buffer.isBuffer(a)) a = Buffer(a)
    if (!Buffer.isBuffer(b)) b = Buffer(b)
    let res = []
    let length = Math.min(a.length, b.length)
    for (let i = 0; i < length; i++) {
      res.push(a[i] ^ b[i])
    }
    return Buffer(res)
  }

  getAccounts(address) {
    const accountsApi = "/auth/accounts/"

    return fetch(this.url + accountsApi + address).then(response =>
      response.json()
    )
  }

  getStakingBalance(address) {
    const stakingBalanceApi = `/staking/delegators/${address}/delegations`

    return fetch(this.url + stakingBalanceApi).then(response => response.json())
  }

  getAddress(mnemonic) {
    if (typeof mnemonic !== "string") {
      throw new Error("mnemonic expects a string")
    }
    const seed = bip39.mnemonicToSeed(mnemonic)
    const node = bip32.fromSeed(seed)
    const child = node.derivePath(this.path)
    const words = bech32.toWords(child.identifier)
    return bech32.encode(this.bech32MainPrefix, words)
  }

  getECPairPriv(mnemonic) {
    if (typeof mnemonic !== "string") {
      throw new Error("mnemonic expects a string")
    }
    const seed = bip39.mnemonicToSeed(mnemonic)
    const node = bip32.fromSeed(seed)
    const child = node.derivePath(this.path)
    const ecpair = bitcoinjs.ECPair.fromPrivateKey(child.privateKey, {
      compressed: false
    })
    return ecpair.privateKey
  }

  getECPairPrivFromPK(privateKey) {
    if (typeof privateKey !== "string") {
      throw new Error("privateKey expects a string")
    }

    const buf = Buffer.from(privateKey, "hex")

    const ecpair = bitcoinjs.ECPair.fromPrivateKey(buf, {
      compressed: false
    })

    return ecpair.privateKey
  }

  encrypt(message, password) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8)

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      iterations: iterations
    })

    const iv = CryptoJS.lib.WordArray.random(128 / 8)

    const encrypted = CryptoJS.AES.encrypt(message, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    })

    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    const transitmessage =
      salt.toString() + iv.toString() + encrypted.toString()
    return transitmessage
  }

  decrypt(transitMessage, password) {
    const salt = CryptoJS.enc.Hex.parse(transitMessage.substr(0, 32))
    const iv = CryptoJS.enc.Hex.parse(transitMessage.substr(32, 32))
    const encrypted = transitMessage.substring(64)

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      iterations: iterations
    })

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }).toString(CryptoJS.enc.Utf8)

    return decrypted
  }

  getPubKeyBase64(ecpairPriv) {
    const pubKeyByte = secp256k1.publicKeyCreate(ecpairPriv)
    return Buffer.from(pubKeyByte, "binary").toString("base64")
  }

  convertStringToBytes(str) {
    if (typeof str !== "string") {
      throw new Error("str expects a string")
    }
    var myBuffer = []
    var buffer = Buffer.from(str, "utf8")
    for (var i = 0; i < buffer.length; i++) {
      myBuffer.push(buffer[i])
    }
    return myBuffer
  }

  NewStdMsg(msgs, account_number, sequence, memo = "", gas_price, gas_limit) {
    const stdSignMsg = new Object()

    if (sequence === undefined) {
      sequence = "0"
    }

    stdSignMsg.json = {
      account_number: String(account_number),
      chain_id: this.chainId,
      fee: {
        amount: [{
          amount: String(new BigNumber(gas_price).multipliedBy(gas_limit).toFixed(8)),
          denom: "tokt"
        }],
        gas: String(gas_limit)
      },
      memo: memo,
      msgs: msgs,
      sequence: String(sequence)
    }

    stdSignMsg.bytes = this.convertStringToBytes(
      JSON.stringify(sortObject(stdSignMsg.json))
    )

    return stdSignMsg
  }

  sign(stdSignMsg, ecpairPriv, modeType = "sync") {
    // The supported return types includes "block"(return after tx commit), "sync"(return afer CheckTx) and "async"(return right away).
    let signMessage = new Object()
    signMessage = stdSignMsg.json

    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify(sortObject(signMessage)))
      .digest("hex")
    const buf = Buffer.from(hash, "hex")

    let signObj = secp256k1.sign(buf, ecpairPriv)
    var signatureBase64 = Buffer.from(signObj.signature, "binary").toString(
      "base64"
    )
    let signedTx = new Object()

    signedTx = {
      tx: {
        msg: stdSignMsg.json.msgs,
        signatures: [{
          pub_key: {
            type: "tendermint/PubKeySecp256k1",
            value: this.getPubKeyBase64(ecpairPriv)
          },
          signature: signatureBase64,
        }],
        memo: stdSignMsg.json.memo,
        fee: stdSignMsg.json.fee
        // chain_id: stdSignMsg.json.chain_id,
        // account_number: stdSignMsg.json.account_number,
        // sequence: stdSignMsg.json.sequence,
      },
      mode: modeType
    }

    return signedTx
  }

  broadcast(signedTx) {
    const broadcastApi = "/txs"

    return fetch(this.url + broadcastApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signedTx)
    }).then(response => response.json())
  }

  async delegate(from, validator, amount, memo, pk, gas_price, gas_limit) {
    const account = await this.getAccounts(from)
    const account_number = account.result.value.account_number
    const sequence = account.result.value.sequence
    const ecpairPriv = await this.getECPairPrivFromPK(pk)

    const msgs = [{
      type: "cosmos-sdk/MsgDelegate",
      value: {
        amount: {
          amount: String(amount),
          denom: process.env.DENOM
        },
        delegator_address: from,
        validator_address: validator
      }
    }]

    const stdSignMsg = await this.NewStdMsg(msgs, account_number, sequence, memo, gas_price, gas_limit)
    const signedTx = await this.sign(stdSignMsg, ecpairPriv, process.env.SIGN_MODE_TYPE)

    return await this.broadcast(signedTx)
  }

  async undelegate(from, validator, amount, memo, pk, gas_price, gas_limit) {
    const account = await this.getAccounts(from)
    const account_number = account.result.value.account_number
    const sequence = account.result.value.sequence
    const ecpairPriv = await this.getECPairPrivFromPK(pk)

    const msgs = [{
      type: "cosmos-sdk/MsgUndelegate",
      value: {
        amount: {
          amount: String(amount),
          denom: process.env.DENOM
        },
        delegator_address: from,
        validator_address: validator
      }
    }]

    const stdSignMsg = await this.NewStdMsg(msgs, account_number, sequence, memo, gas_price, gas_limit)
    const signedTx = await this.sign(
      stdSignMsg,
      ecpairPriv,
      process.env.SIGN_MODE_TYPE
    )

    return await this.broadcast(signedTx)
  }

  async send(payload, from, memo, pk, gas_price, gas_limit) {
    const account = await this.getAccounts(from)
    const account_number = account.result.value.account_number
    const sequence = account.result.value.sequence
    const ecpairPriv = await this.getECPairPrivFromPK(pk)

    const msgs = [payload]

    const stdSignMsg = await this.NewStdMsg(msgs, account_number, sequence, memo, gas_price, gas_limit)
    const signedTx = await this.sign(
      stdSignMsg,
      ecpairPriv,
      process.env.SIGN_MODE_TYPE
    )

    return await this.broadcast(signedTx)
  }

  async withdrawRewards(from, validator_address, memo, pk, gas_price, gas_limit) {
    const account = await this.getAccounts(from)
    const account_number = account.result.value.account_number
    const sequence = account.result.value.sequence
    const ecpairPriv = await this.getECPairPrivFromPK(pk)

    const msgs = [{
      type: "cosmos-sdk/MsgWithdrawDelegationReward",
      value: {
        delegator_address: from,
        validator_address: validator_address
      }
    }]

    const stdSignMsg = await this.NewStdMsg(msgs, account_number, sequence, memo, gas_price, gas_limit)
    const signedTx = await this.sign(
      stdSignMsg,
      ecpairPriv,
      process.env.SIGN_MODE_TYPE
    )

    return await this.broadcast(signedTx)
  }

  async withdrawAllRewards(valoper, from, memo, pk, gas_price, gas_limit) {
    const account = await this.getAccounts(from)
    const account_number = account.value.account_number
    const sequence = account.value.sequence
    const ecpairPriv = await this.getECPairPrivFromPK(pk)

    const msgs = [{
      type: "okchain/distribution/MsgWithdrawReward",
      value: {
        validator_address: valoper
      }
    }]

    const stdSignMsg = await this.NewStdMsg(msgs, account_number, sequence, memo, gas_price, gas_limit)
    const signedTx = await this.sign(
      stdSignMsg,
      ecpairPriv,
      process.env.SIGN_MODE_TYPE
    )

    return await this.broadcast(signedTx)
  }

  async newOrder(payload, from, memo, pk, gas_price, gas_limit) {
    const account = await this.getAccounts(from)
    const account_number = account.value.account_number
    const sequence = account.value.sequence
    const ecpairPriv = await this.getECPairPrivFromPK(pk)

    // let payload = {
    //   "price": "900.00000000",
    //   "product": "tbtc_tusdk",
    //   "quantity": "1.00000000",
    //   "side": "BUY"
    // }

    const msgs = [{
      type: "okchain/order/MsgNew",
      value: {
        order_items: [
          payload
        ],
        sender: from
      }
    }]

    const stdSignMsg = await this.NewStdMsg(msgs, account_number, sequence, memo, gas_price, gas_limit)
    const signedTx = await this.sign(stdSignMsg, ecpairPriv, process.env.SIGN_MODE_TYPE)

    return await this.broadcast(signedTx)
  }

  async cancelOrder(payload, from, memo, pk, gas_price, gas_limit) {
    const account = await this.getAccounts(from)
    const account_number = account.value.account_number
    const sequence = account.value.sequence
    const ecpairPriv = await this.getECPairPrivFromPK(pk)

    // let payload = [
    //   "ID0006586470-1"
    // ]

    const msgs = [{
      type: "okchain/order/MsgCancel",
      value: {
        order_ids: payload,
        sender: from
      }
    }]

    const stdSignMsg = await this.NewStdMsg(msgs, account_number, sequence, memo, gas_price, gas_limit)
    const signedTx = await this.sign(stdSignMsg, ecpairPriv, process.env.SIGN_MODE_TYPE)

    return await this.broadcast(signedTx)
  }

  async tokenIssue(payload, from, memo, pk, gas_price, gas_limit) {
    const account = await this.getAccounts(from)
    const account_number = account.value.account_number
    const sequence = account.value.sequence
    const ecpairPriv = await this.getECPairPrivFromPK(pk)

    const msgs = [{
      type: "okchain/token/MsgIssue",
      value: payload
    }]

    const stdSignMsg = await this.NewStdMsg(msgs, account_number, sequence, memo, gas_price, gas_limit)
    const signedTx = await this.sign(stdSignMsg, ecpairPriv, process.env.SIGN_MODE_TYPE)

    return await this.broadcast(signedTx)
  }

  async deposit(payload, from, memo, pk, gas_price, gas_limit) {
    const account = await this.getAccounts(from)
    const account_number = account.value.account_number
    const sequence = account.value.sequence
    const ecpairPriv = await this.getECPairPrivFromPK(pk)

    const msgs = [{
      type: "okchain/staking/MsgDelegate",
      value: payload
    }]

    const stdSignMsg = await this.NewStdMsg(msgs, account_number, sequence, memo, gas_price, gas_limit)
    const signedTx = await this.sign(stdSignMsg, ecpairPriv, process.env.SIGN_MODE_TYPE)

    return await this.broadcast(signedTx)
  }

  async addShares(payload, from, memo, pk, gas_price, gas_limit) {
    const account = await this.getAccounts(from)
    const account_number = account.value.account_number
    const sequence = account.value.sequence
    const ecpairPriv = await this.getECPairPrivFromPK(pk)

    const msgs = [{
      type: "okchain/staking/MsgVote",
      value: payload
    }]

    const stdSignMsg = await this.NewStdMsg(msgs, account_number, sequence, memo, gas_price, gas_limit)
    const signedTx = await this.sign(stdSignMsg, ecpairPriv, process.env.SIGN_MODE_TYPE)

    return await this.broadcast(signedTx)
  }
}

String.prototype.escapeSpecialChars = () => {
  return this.replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f")
}

export default Bitsong