export interface TokenWeight {
    address: string;
    weight: number;
    timeWeighted: boolean;
}

export interface TokenList {
    label: string;
    value: string;
    uri: string;
}

export interface Token {
    label: string;
    value: string;
    uri: string;
    address: string;
    weight: number;
    timeWeighted: boolean;
}

export interface Policy {
    index: number,
    description: string;
    vouchers: string;
}

export interface Proposal {
    title: string;
    description: string;
    orgAddress: string;
    Erc20Weights: TokenWeight[];
    Erc721Multipliers: TokenWeight[];
    tallyingSystem: number;
    policies: Policy[];
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
