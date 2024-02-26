
import { Proposal } from '../../Interfaces';
import ProposalsRow from './ProposalsRow';

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

interface ProposalsDisplayProps {
    proposals: Proposal[]
}

function ProposalsDisplay(props: ProposalsDisplayProps) {
    const groupedProposals = groupBy(props.proposals, i=>i.orgAddress)
     
    
    return (
    <div>
      {Object.entries(groupedProposals).map(([address, items]) => (
        <ProposalsRow proposals={items} orgAddress={address}/>
      ))}
    </div>
      );
}

export default ProposalsDisplay