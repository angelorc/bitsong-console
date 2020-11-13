//import BitSongClient from "@bitsongofficial/js-sdk"
import { v4 as uuidv4 } from 'uuid';
import FileSaver from "file-saver"

import * as crypto from "@/lib/crypto"

class Wallet {
  constructor() {
  }

  createAccountWithMnemonic = async () => {
    const mnemonic = crypto.generateMnemonic()
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    const address = crypto.getAddressFromPrivateKey(
      privateKey,
      this.addressPrefix
    )
    return {
      privateKey,
      address,
      mnemonic,
    }
  }

  generateAndDownloadKeyStore = async (privateKey, password) => {
    try {
      const keystore = await crypto.generateKeyStore(privateKey, password)
      const uuid = uuidv4()
      const blob = new Blob([JSON.stringify(keystore)], {
        type: "text/plain;charset=utf-8"
      })

      FileSaver.saveAs(blob, `btsg_${uuid}_keystore.txt`)

      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  recoverAccountFromPrivateKey = async (privateKey) => {
    const address = crypto.getAddressFromPrivateKey(
      privateKey,
      this.addressPrefix
    )
    return {
      privateKey,
      address,
    }
  }

  recoverAccountFromMnemonic = async (mnemonic) => {
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    const address = crypto.getAddressFromPrivateKey(
      privateKey,
      this.addressPrefix
    )
    return {
      privateKey,
      address,
    }
  }

  recoverAccountFromKeystore = async (keystore, password) => {
    const privateKey = crypto.getPrivateKeyFromKeyStore(keystore, password)
    const address = crypto.getAddressFromPrivateKey(
      privateKey,
      this.addressPrefix
    )
    return {
      privateKey,
      address,
    }
  }
}

export default Wallet
