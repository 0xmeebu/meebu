import tokens from "../tokenList";
import { Avatar, AvatarGroup, List, Tooltip } from '@mantine/core';



interface Erc20Weights {
  address: string;
  weight: number;
  timeWeighted: boolean;
}

interface Token {
   label: string; 
   value: string; 
   uri: string; 
}

interface TokenWeightsProps {
  votes?: [Erc20Weights];
}


function mergeObjects(listA: Erc20Weights[], listB: Token[]): (Erc20Weights & Token)[] {
  console.log(listA)
  const intersection = listA.filter(a => listB.some(b => b.value === a.address));
  return intersection.map(item => {
      const correspondingB = listB.find(b => b.value === item.address)!; // Non-null assertion, modify as needed for safety
      return { ...item, ...correspondingB };
  });
}

function TokenWeights (props: TokenWeightsProps){
  let ERC20Weights = [
    {
      "address": "0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd",
      "weight": 12,
      "timeWeighted": false
    },
    {
      "address": "0x08d967bb0134F2d07f7cfb6E246680c53927DD30",
      "weight": 17,
      "timeWeighted": false
    },
    {
      "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      "weight": 0,
      "timeWeighted": false
    }
  ]
  
  const votingTokens = mergeObjects(ERC20Weights, tokens);
  
  console.log(votingTokens)
  return(
    <Tooltip label="test">
      <AvatarGroup>
        {votingTokens.map((token, index) => (
        <Avatar  src={token.uri}/>
            ))}
      </AvatarGroup>
    </Tooltip>
  );
}

export default TokenWeights