import ProposalsRow from './ProposalsRow';
import { UseMeebuState } from "../../Hooks/UseMeebuState";
import { Loader } from '@mantine/core';

function ProposalsDisplay() {
  const { state, updating, error } = UseMeebuState();

  if (state === null) {
    return (<Loader color="pink" type="dots" />)
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
