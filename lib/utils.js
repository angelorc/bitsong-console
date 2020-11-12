import toDate from "date-fns/esm/toDate";
import parseISO from "date-fns/esm/parseISO";
import formatDistanceStrict from "date-fns/esm/formatDistanceStrict";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import decode from "entity-decode";
import BigNumber from "bignumber.js";

import * as bech32 from "bech32";
import crypto from 'crypto'

export const parserErrorResponse = (response) => {
  let parsedResponse = {
    success: false,
    tx_hash: null,
    log: null
  }

  if (response.height === '0' || response.logs === undefined) {
    parsedResponse.log = response.raw_log
  } else {
    parsedResponse.success = true
    parsedResponse.tx_hash = response.txhash
  }

  return parsedResponse
}

export const convertMicroDenom = (denom) => {
  if (denom === null) return
  return denom.charAt(0).toUpperCase() === 'U' ? denom.substring(1).toUpperCase() : denom.toUpperCase()
}

export const convertMicroToMacroAmount = (amount, decimals) => {
  return amount / (10 ** decimals)
}

export const convertMacroToMicroAmount = (amount, decimals) => {
  return amount * (10 ** decimals)
}

export const pubkeyToAddress = (valconspub) => {
  const words = bech32.decode(valconspub).words
  // publickey is prefixed somehow (probably amino)
  const publicKey = Buffer.from(
    Buffer.from(bech32.fromWords(words)).toString('hex').substr(10),
    'hex'
  )
  // the address is the first 20 bytes of the sha256 hash of the publickey
  const hexAddress = crypto
    .createHash('sha256')
    .update(publicKey)
    .digest()
    .toString('hex')
    .substr(0, 40)
  return hexAddress.toUpperCase()
}

export const calculateVotingPower = (share, total_power) => {
  if (share === null) return 0
  const sharePower = new BigNumber(share)
  return new BigNumber(sharePower)
    .div(total_power)
    .multipliedBy(100)
    .toFixed(2)
}

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatDistanceWord(word) {
  return word.replace('seconds', 'sec ago')
    .replace('minutes', 'min ago')
}

export function getTimeDistance(timestamp) {
  if (typeof timestamp === "string") {
    //timestamp = parseISO(timestamp);ù
    timestamp = new Date(timestamp);
  }
  const now = new Date();
  // if timestamp from future
  if (timestamp > now) {
    timestamp = now;
  }

  const distance = formatDistanceStrict(timestamp, now, {
    roundingMethod: "floor"
  });

  return distance && distance !== "Invalid Date" ? formatDistanceWord(distance) : false;
}

export function pretty(value) {
  const PRECISION = 2;
  if (value >= 1 || value <= -1 || Number(value) === 0) {
    return decode(
      prettyNum(value, {
        precision: PRECISION,
        precisionSetting: PRECISION_SETTING.FIXED,
        thousandsSeparator: "&#x202F;"
      })
    );
  } else {
    value = decode(
      prettyNum(value, {
        precision: PRECISION,
        precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT,
        thousandsSeparator: "&#x202F;"
      })
    );
    value = value.substr(0, 10);
    if (value === "0.00000000") {
      return "0.00";
    }
    return value;
  }
}

export function prettyUsd(value) {
  return decode(
    prettyNum(value, { precision: 2, thousandsSeparator: "&#x202F;" })
  );
}

export function prettyRound(value) {
  return decode(
    prettyNum(value, { precision: 0, thousandsSeparator: "&#x202F;" })
  );
}

export function prettyExact(value) {
  return decode(prettyNum(value, { thousandsSeparator: "&thinsp;" }));
}

/**
 * Round to power
 * @param {number} value
 * @param {number} power
 * @return {number}
 */
export function round(value, power) {
  let tenPower = Math.pow(10, power);
  return Math.round(value * tenPower) / tenPower;
}

export function shortFilter(value, endLength = 6, minLengthToShort) {
  const startLength = endLength + "Mx".length - 1;
  minLengthToShort = minLengthToShort || startLength + endLength;
  value = value.toString();
  const isLong = value.length > minLengthToShort;

  return isLong
    ? value.substr(0, startLength) + "…" + value.substr(-endLength)
    : value;
}

