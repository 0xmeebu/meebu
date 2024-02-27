import { Card, Text, Badge, Button, Group } from '@mantine/core';
import TokenWeights from '../TokenWeights';
import RankedVoteModal from '../RankedVoteModal';
import { UseMeebuState } from "../../Hooks/UseMeebuState";


interface ProposalCardProps {
  index: number;
  orgAddress: string;
}


function ProposalCard(props: ProposalCardProps) {
  const { data, isPending, error } = UseMeebuState("http://localhost:8080/inspect");
  const proposal = data.Orgs[props.orgAddress].Proposals[props.index]

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder miw={500}>

      <Group>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={700}>{proposal.title}</Text>
          <Badge color="pink">{proposal.tallyingSystem}</Badge>
        </Group>
      </Group>


      <Text size="sm" c="dimmed">
        {proposal.description}
      </Text>

      <Group gap="sm">
        <TokenWeights weights={proposal.Erc20Weights} cat='Weight' />
        <TokenWeights weights={proposal.Erc721Multipliers} cat='Multiplier' />
      </Group>

      <RankedVoteModal issueOrgAddress={props.orgAddress} issueIndex={props.index} issueTitle={proposal.title} issueDescription={proposal.description} issuePolicies={proposal.policies} />
    </Card>
  );
}

export default ProposalCard
