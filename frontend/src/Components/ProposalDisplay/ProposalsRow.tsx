import { Divider, Flex, ScrollArea, Text } from '@mantine/core';
import ProposalCard from './ProposalCard';
import { UseMeebuState } from "../../Hooks/UseMeebuState";
import { IconPinned } from '@tabler/icons-react'

interface ProposalsRowProps {
  orgAddress: string
}

function ProposalsRow(props: ProposalsRowProps) {
  const { data, isPending, error } = UseMeebuState("http://localhost:8080/inspect");
  const proposals = data.Orgs[props.orgAddress].Proposals

  return (
    <>
      <Divider
        my="lg"
        size='sm'
        color='pink'
        label={<>
          <IconPinned color='#FF08FF' />
          <Text c='pink' size='sm' fw={700}>
            {props.orgAddress}</Text> </>
        }
        labelPosition="left"
      />
      <ScrollArea>
        <Flex gap="lg">
          {proposals.map((proposal, index) => (
            <ProposalCard index={index} orgAddress={proposal.orgAddress}></ProposalCard>
          ))}
        </Flex>
      </ScrollArea>
    </>
  );
}

export default ProposalsRow
