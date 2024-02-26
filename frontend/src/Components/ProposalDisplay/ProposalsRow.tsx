import { Divider, Flex, ScrollArea, Text} from '@mantine/core';
import ProposalCard from './ProposalCard';
import { Proposal } from '../../Interfaces';
import tallingSystemList  from '../../tallyingSystemList';
import { IconPinned } from '@tabler/icons-react'

interface ProposalsRowProps {
proposals: Proposal[]
orgAddress: string

}

function ProposalsRow(props: ProposalsRowProps) {
 
  return (
    <>
    <Divider my="lg" size='sm' color='pink' label={<> <IconPinned color='#FF08FF'/>  <Text color='pink' size='sm' fw={700}>{props.orgAddress}</Text> </>} labelPosition="left" />
    <ScrollArea>
    <Flex gap="lg">
{ props.proposals.map((proposal, index) => (
     <ProposalCard  index={index} title={proposal.title} orgAddress={proposal.orgAddress} tallyingSystem={tallingSystemList[proposal.tallyingSystem].label} description={proposal.description} erc20Weights={proposal.ERC20Weights} erc721Multipliers={proposal.ERC20Weights} policies={proposal.policies}></ProposalCard>
           ))}
    </Flex>
    </ScrollArea>
    </>
  );
}

export default ProposalsRow