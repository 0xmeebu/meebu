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
    <div>
      {Object.entries(state.Orgs).map(([string, _org]) => (
        < ProposalsRow state={state} orgAddress={string} />
      ))}
    </div>
  );
}

export default ProposalsDisplay
