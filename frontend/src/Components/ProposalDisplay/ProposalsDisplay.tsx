import ProposalsRow from './ProposalsRow';
import { UseMeebuState } from "../../Hooks/UseMeebuState";




function ProposalsDisplay() {
  const { state, updating, error } = UseMeebuState();

  console.log(JSON.stringify(state, null, 2))

  if (state === null) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <>
      {Object.entries(state.Orgs).map(([string, _org]) => (
        < ProposalsRow state={state} orgAddress={string} />
      ))}
    </>
  );
}

export default ProposalsDisplay
