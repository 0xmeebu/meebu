import { Card, Image, Text, Badge, Button, Group, Stack} from '@mantine/core';
import TokenWeights from './TokenWeights';
import { TokenWeight } from "../Interfaces"


interface Policy {
  // Structure definition
}

interface ProposalCardProps {
  title: string;
  description: string;
  orgAddress: string;
  // erc20Weights: Erc20Weights[];
  // erc721Multipliers: Erc721Multipliers[];
  tallyingSystem: string;
  // ballot: Policy[];
}


const ERC20Weights = [
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

function ProposalCard(props: ProposalCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>

        <Group>
          <Text size="sm" fs='italic'>{props.orgAddress}</Text>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={700}>{props.title}</Text>
            <Badge color="pink">{props.tallyingSystem}</Badge>
          </Group>
        </Group>


      <Text size="sm" c="dimmed">
        {props.description}
      </Text>

      <Group gap="sm">
      <TokenWeights weights={ERC20Weights} cat='Weight'/>
      <TokenWeights weights={ERC20Weights} cat='Multiplier'/>
    </Group>

  

      <Button color="pink" fullWidth mt="md" radius="md">
        Vote
      </Button>
    </Card>
  );
}

export default ProposalCard