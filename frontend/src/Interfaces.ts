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
  description: string;
  vouchers: string;
  }
