import ProposalsDisplay from './ProposalsDisplay';
import { Proposal } from '../../Interfaces';
import { proposalsList } from '../../proposalList';


const getProposals = (): Proposal[] => {
    return proposalsList;
}


function FetchProposals() {
  return (
    <ProposalsDisplay proposals={getProposals()}/>
  );
}

export default FetchProposals