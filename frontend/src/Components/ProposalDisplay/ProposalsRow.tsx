import { Divider, Flex, ScrollArea, Text } from '@mantine/core';
import ProposalCard from './ProposalCard';
import { IconPinned } from '@tabler/icons-react'
import { MeebuState } from '../../Interfaces';

interface ProposalsRowProps {
  state: MeebuState;
  orgAddress: string
}

function ProposalsRow(props: ProposalsRowProps) {
  const proposals = props.state.Orgs[props.orgAddress].Proposals

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
            <ProposalCard state={props.state} index={index} orgAddress={proposal.orgAddress}></ProposalCard>
          ))}
        </Flex>
      </ScrollArea>
    </>
  );
}

export default ProposalsRow
