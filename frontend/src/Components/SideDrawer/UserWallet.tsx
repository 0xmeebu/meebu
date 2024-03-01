import { MeebuState, newUserProposalStatus, TokenInfo, TokenWeight } from '../../Interfaces';
import tokens from "../../Data/tokenList";
import { useRollups } from '../../useRollups';
import DisplayWallet from '../DisplayWallet';
import { UseMeebuState } from "../../Hooks/UseMeebuState";

interface UserWalletProps {
    Erc20Weights: any
    unitLabel?: string
    suffix?: string
}

function addInfo(t: Map<string, TokenWeight>): Map<string, TokenInfo> {
    let ret = new Map<string, TokenInfo>
  
    t.forEach((v, k, _m) => {
      ret.set(k, {
        address: k,
        weight: v.Weight,
        timeWeighted: v.TimeWeighted,
        label: null,
        uri: null,
      })
    })
  
    tokens.forEach(tl => {
      let t = ret.get(tl.value)
      if (t) {
        t.label = tl.label
        t.uri = tl.uri
      }
    })
  
    return ret
  }

function UserWallet(props: UserWalletProps) {
    const { state, updating, error } = UseMeebuState();

    if (state === null) {
        return (
        <div>
            Loading...
        </div>
        );
    }

    const voters = state.Voters

    console.log('voters', state)

    return(
        <></>        
    )
    }


export default UserWallet
