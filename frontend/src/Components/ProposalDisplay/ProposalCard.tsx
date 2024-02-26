import { Card, Text, Badge, Button, Group} from '@mantine/core';
import TokenWeights from '../TokenWeights';
import { TokenWeight } from "../../Interfaces"
import RankedVoteModal from '../RankedVoteModal';
import { Policy } from '../../Interfaces';


interface ProposalCardProps {
  index: number;
  title: string;
  description: string;
  orgAddress: string;
  erc20Weights: TokenWeight[];
  erc721Multipliers: TokenWeight[];
  tallyingSystem: string;
  policies: Policy[];
}


function ProposalCard(props: ProposalCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder miw={500}>

        <Group>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={700}>{props.title}</Text>
            <Badge color="pink">{props.tallyingSystem}</Badge>
          </Group>
        </Group>


      <Text size="sm" c="dimmed">
        {props.description}
      </Text>

      <Group gap="sm">
      <TokenWeights weights={props.erc20Weights} cat='Weight'/>
      <TokenWeights weights={props.erc721Multipliers} cat='Multiplier'/>
    </Group>

     <RankedVoteModal issueOrgAddress={props.orgAddress} issueIndex={props.index} issueTitle={props.title} issueDescription={props.description} issuePolicies={props.policies}/>
    </Card>
  );
}

export default ProposalCard