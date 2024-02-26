import tokens from "../tokenList";
import { Avatar, AvatarGroup, Text, HoverCard } from '@mantine/core';
import { TokenWeight, TokenList, Token } from "../Interfaces"
import TokenTable from "./Table";


interface TokenWeightsProps {
  weights: TokenWeight[];
  cat: string
}


function mergeObjects(listA: TokenWeight[], listB: TokenList[]): (Token)[] {
  const intersection = listA.filter(a => listB.some(b => b.value === a.address));
  return intersection.map(item => {
      const correspondingB = listB.find(b => b.value === item.address)!; // Non-null assertion, modify as needed for safety
      return { ...item, ...correspondingB };
  });
}

function TokenWeights (props: TokenWeightsProps){
    const votingTokens = mergeObjects(props.weights, tokens);
  return(
    <HoverCard width={280} shadow="md">
        <HoverCard.Target>
      <AvatarGroup>
        {votingTokens.map((token, index) => (
        <Avatar  src={token.uri}/>
            ))}
      </AvatarGroup>
      </HoverCard.Target>
        <HoverCard.Dropdown>
          <TokenTable weights={votingTokens} catg={props.cat} />
        </HoverCard.Dropdown>
      </HoverCard>
  );
}

export default TokenWeights