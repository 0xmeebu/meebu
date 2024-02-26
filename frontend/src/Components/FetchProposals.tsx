import ProposalsGrid from './ProposalsGrid';
import { Proposal } from '../Interfaces';
import { proposalsList } from '../proposalList';


const getProposals = (): Proposal[] => {
    return proposalsList;
}


function FetchProposals() {
  return (
    <ProposalsGrid proposals={getProposals()}/>
  );
}

export default FetchProposals