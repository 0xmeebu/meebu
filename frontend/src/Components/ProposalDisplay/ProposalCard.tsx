import { Card, Text, Badge, Group } from '@mantine/core';
import TokenWeights from '../TokenWeights';
import RankedVoteModal from '../RankedVoteModal';
import { MeebuState } from '../../Interfaces';
import tallingSystemList from '../../tallyingSystemList';

interface ProposalCardProps {
  state: MeebuState;

  index: number;
  orgAddress: string;
}

function ProposalCard(props: ProposalCardProps) {
  const org = props.state.Orgs[props.orgAddress]
  if (!org) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const proposal = org.Proposals[props.index]

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder miw={500}>

      <Group>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={700}>{proposal.Title}</Text>
          <Badge color="pink">{tallingSystemList[proposal.TallyingSystem].label}</Badge>
        </Group>
      </Group>


      <Text size="sm" c="dimmed">
        {proposal.Description}
      </Text>

      <Group gap="sm">
        <TokenWeights weights={new Map(Object.entries(proposal.Erc20Weights))} cat='Weight' />
        <TokenWeights weights={new Map(Object.entries(proposal.Erc721Multipliers))} cat='Multiplier' />
      </Group>

      <RankedVoteModal issueOrgAddress={props.orgAddress} issueIndex={props.index} issueTitle={proposal.Title} issueDescription={proposal.Description} issuePolicies={proposal.Policies} />
    </Card>
  );
}

export default ProposalCard
