export interface TokenWeight {
  Weight: number;
  TimeWeighted: boolean;
}

export interface TokenList {
  label: string;
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

export interface Policy {
  Description: string;
  Vouchers: string;
}

export interface Vote {
  policy: Policy;
  index: number;
}

export interface Proposal {
  Title: string;
  Description: string;
  OrgAddress: string;
  Erc20Weights: { [key: string]: TokenWeight };
  Erc721Multipliers: { [key: string]: TokenWeight };
  TallyingSystem: number;
  Ballot: Policy[];
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
