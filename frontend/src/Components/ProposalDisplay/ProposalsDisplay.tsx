import ProposalsRow from './ProposalsRow';
import { UseMeebuState } from "../../Hooks/UseMeebuState";

function ProposalsDisplay() {
    const { data, isPending, error } = UseMeebuState("http://localhost:8080/inspect");

    return (
        <div>
            {Object.entries(data.Orgs).map(([string, _org]) => (
                <ProposalsRow orgAddress={string} />
            ))}
        </div>
    );
}

export default ProposalsDisplay
