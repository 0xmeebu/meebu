import { Flex, ScrollArea } from '@mantine/core';
import ProposalCard from './ProposalCard';
import { MeebuState } from '../../Interfaces';
import DaoDivider from './DaoDivider';

interface ProposalsRowProps {
  state: MeebuState;
  orgAddress: string
}

function ProposalsRow(props: ProposalsRowProps) {
  const org = props.state.Orgs[props.orgAddress]
  if (!org) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const proposals = org.Proposals


  return (
    <>
      <DaoDivider label={props.orgAddress} />
      <ScrollArea>
        <Flex gap="xl">
          {proposals.map((_proposal, index) => (
            <ProposalCard state={props.state} index={index} orgAddress={props.orgAddress}></ProposalCard>
          ))}
        </Flex>
      </ScrollArea>
    </>
  );
}

export default ProposalsRow
