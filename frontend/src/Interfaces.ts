import tokens from "./Data/tokenList";
import { BigNumber } from "ethers";

export interface TokenWeight {
  Weight: number;
  TimeWeighted: boolean;
}

export interface TokenList {
  address: string;
  value: string;
  uri: string;
}

export interface TokenInfo {
  address: string;
  weight: number;
  timeWeighted: boolean;

  label: string | null;
  uri: string | null;
}

export interface TokenBalance {
  address: string;
  balance: string;
  label: string | null;
  uri: string | null;
}


export interface Policy {
  Description: string;
  Voucher: string;
}

export interface Vote {
  policy: Policy;
  index: number;
}

export interface Proposal {
  Title: string;
  Description: string;
  Erc20Weights: { [key: string]: TokenWeight };
  Erc721Multipliers: { [key: string]: TokenWeight };
  TallyingSystem: number;
  Ballot: Policy[];
  Open: boolean;
  HasVoted: { [key: string]: boolean };
}

export interface VoterBalance {
  // ERC20 address => balance
  Erc20Balances: { [key: string]: Erc20Balance };

  // ERC721 address => has NFT of that "kind"
  Erc721Owned: { [key: string]: boolean };
}

export interface Erc20Balance {
  Balance: string;
}

export interface Org {
  Proposals: Proposal[]
}

type orgMap = { [key: string]: Org }
type voterMap = { [key: string]: VoterBalance }

export interface MeebuState {
  OrgFactory: string
  Orgs: orgMap
  Voters: voterMap
}


export interface UserProposalStatus {
  hasVoted: boolean;
  power: BigNumber;
  totalVoters: number;
  averagePower: string;
}


export function userPower(
  erc20Weights: { [key: string]: TokenWeight },
  erc721Multipliers: { [key: string]: TokenWeight },
  balances: VoterBalance
): BigNumber {
  let power = BigNumber.from(0)

  for (let [address, t] of Object.entries(erc20Weights)) {
    let b = balances.Erc20Balances[address]
    if (b) {
      let balance = BigNumber.from(b.Balance)
      power = power.add(balance.mul(t.Weight))
    }
  }

  for (let [address, t] of Object.entries(erc721Multipliers)) {
    if (balances.Erc721Owned[address]) {
      power = power.mul(t.Weight)
    }
  }

  return power
}

export function newUserProposalStatus(
  proposal: Proposal,
  voterMap: voterMap,
  user: string | null
): UserProposalStatus {
  let powers: { [key: string]: BigNumber } = {}
  for (let [address, balances] of Object.entries(voterMap)) {
    powers[address] = userPower(proposal.Erc20Weights, proposal.Erc721Multipliers, balances)
  }


  let totalVoters = 0
  let totalPower = BigNumber.from(0)
  for (let [address, b] of Object.entries(proposal.HasVoted)) {
    if (b) {
      totalVoters++
      totalPower = totalPower.add(powers[address])
    }
  }

  let averagePower
  if (totalVoters == 0) {
    averagePower = "n/a"
  } else {
    averagePower = totalPower.div(totalVoters).toString()
  }

  return {
    hasVoted: proposal.HasVoted[user || ""] || false,
    power: powers[user || ""] || BigNumber.from(0),
    totalVoters,
    averagePower,
  }
}


export function addInfo(t: Map<string, TokenWeight>): Map<string, TokenInfo> {
  let ret = new Map<string, TokenInfo>

  t.forEach((v, k, _m) => {
    ret.set(k, {
      address: k,
      weight: v.Weight,
      timeWeighted: v.TimeWeighted,
      label: null,
      uri: null,
    })
  })

  tokens.forEach(tl => {
    let t = ret.get(tl.value)
    if (t) {
      t.label = tl.label
      t.uri = tl.uri
    }
  })

  return ret
}

export function addInfo2(t: Map<string, Erc20Balance>): Map<string, TokenBalance> {
  let ret = new Map<string, TokenBalance>

  t.forEach((v, k, _m) => {
    ret.set(k, {
      address: k,
      balance: v.Balance,
      label: null,
      uri: null,
    })
  })

  tokens.forEach(tl => {
    let t = ret.get(tl.value)
    if (t) {
      t.label = tl.label
      t.uri = tl.uri
    }
  })

  return ret
}

