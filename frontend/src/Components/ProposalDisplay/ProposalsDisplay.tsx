
import { Proposal } from '../../Interfaces';
import ProposalsRow from './ProposalsRow';
import { UseMeebuState } from "../../Hooks/UseMeebuState";

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

interface ProposalsDisplayProps {
    proposals: Proposal[]
}

function ProposalsDisplay(props: ProposalsDisplayProps) {
    
  const { data, isPending, error } = UseMeebuState("http://localhost:8080/inspect");
  if(data) {
  console.log(typeof(data.reports[0].payload))
  let hexString = data.reports[0].payload
  let jsonString = Buffer.from(hexString.slice(2), 'hex')
  console.log(jsonString)
}

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