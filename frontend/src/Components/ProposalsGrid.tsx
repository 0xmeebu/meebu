import { Grid } from '@mantine/core';
import IssueCard from './ProposalCard';
import { Proposal } from '../Interfaces';
import tallingSystemList  from '../tallyingSystemList';

interface ProposalsGridProps {
proposals: Proposal[]

}

function ProposalsGrid(props: ProposalsGridProps) {
 
  return (
    <Grid>
{ props.proposals.map((proposal, index) => (
      <Grid.Col span={4}><IssueCard index={index} orgAddress={proposal.orgAddress} title={proposal.title} tallyingSystem={tallingSystemList[proposal.tallyingSystem].label} description={proposal.description} erc20Weights={proposal.ERC20Weights} erc721Multipliers={proposal.ERC20Weights} policies={proposal.policies}></IssueCard></Grid.Col>
           ))}
    </Grid>
  );
}

export default ProposalsGrid