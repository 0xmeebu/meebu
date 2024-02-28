import tokens from "../Data/tokenList";
import { Avatar, AvatarGroup, HoverCard } from '@mantine/core';
import { TokenWeight, TokenList, TokenInfo } from "../Interfaces"
import TokenTable from "./Table";


interface TokenWeightsProps {
  weights: Map<string, TokenWeight>;
  cat: string
}

function mergeObjects(tokens: Map<string, TokenWeight>, listB: TokenList[]): Map<string, TokenInfo> {
  let ret = new Map<string, TokenInfo>

  tokens.forEach((v, k, _m) => {
    ret.set(k, {
      address: k,
      weight: v.Weight,
      timeWeighted: v.TimeWeighted,
      label: null,
      uri: null,
    })
  })

  listB.forEach(tl => {
    let t = ret.get(tl.value)
    if (t) {
      t.label = tl.label
      t.uri = tl.uri
    }
  })

  return ret
}

function TokenWeights(props: TokenWeightsProps) {
  let votingTokens = mergeObjects(props.weights, tokens);

  return (
    <HoverCard width={280} shadow="md">
      <HoverCard.Target>
        <AvatarGroup>
          {[...votingTokens.entries()].map(([_address, info], _index) => (
            <Avatar src={info.uri} />
          ))}
        </AvatarGroup>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <TokenTable weights={[...votingTokens.values()]} catg={props.cat} />
      </HoverCard.Dropdown>
    </HoverCard>
  );
}

export default TokenWeights
