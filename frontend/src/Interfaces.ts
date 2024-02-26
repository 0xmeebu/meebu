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
        ERC20Weights: TokenWeight[];
        ERC721Weights: TokenWeight[]; 
        tallyingSystem: number;
        policies: Policy[];

      }
