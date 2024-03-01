import ProposalsRow from './ProposalsRow';
import { UseMeebuState } from "../../Hooks/UseMeebuState";




function ProposalsDisplay() {
  const { state, updating, error } = UseMeebuState();

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
        < ProposalsRow key={string} state={state} orgAddress={string} />
      ))}
    </>
  );
}

export default ProposalsDisplay
