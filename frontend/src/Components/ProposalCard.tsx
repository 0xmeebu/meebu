import { Card, Image, Text, Badge, Button, Group, Stack} from '@mantine/core';
import TokenWeights from './TokenWeights';

interface Erc20Weights {
  address: string;
  weight: number;
  timeWeighted: boolean;
}

interface Erc721Multipliers {
  address: string;
  multiplier: number; // R  epresent the fixed-point number as a regular number, assuming the handling code knows it's in percentage with 2 decimals.
}


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

function ProposalCard(props: ProposalCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>

        <Stack>
        <Text size="sm">{props.orgAddress}</Text>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{props.title}</Text>
            <Badge color="pink">{props.tallyingSystem}</Badge>
          </Group>
        </Stack>


      <Text size="sm" c="dimmed">
        {props.description}
      </Text>

      <TokenWeights />

      <Button color="pink" fullWidth mt="md" radius="md">
        Vote
      </Button>
    </Card>
  );
}

export default ProposalCard