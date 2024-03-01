import { MeebuState, newUserProposalStatus, TokenInfo, TokenWeight } from '../../Interfaces';
import tokens from "../../Data/tokenList";
import { useRollups } from '../../useRollups';
import DisplayWallet from '../DisplayWallet';
import { UseMeebuState } from "../../Hooks/UseMeebuState";

export interface TokenBalance {
  Balance: number;
}



function addInfo(t: Map<string, TokenBalance>): Map<string, TokenInfo> {
    let ret = new Map<string, TokenInfo>
  
    t.forEach((v, k, _m) => {
      ret.set(k, {
        address: k,
        weight: v.Balance,
        label: null,
        uri: null,
        timeWeighted: false
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

function UserWallet() {
    const { state, updating, error } = UseMeebuState();
    const wallet = '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc'


    if (state === null) {
        return (
        <div>
            Loading...
        </div>
        );
    }

    // let erc20Balances = [...addInfo(state.Voters[wallet].Erc20Balances)].map(([x, y]) => {
    //   return (
    //     y
    //   )
    // })

    const w = state.Voters[wallet]
 
    console.log(w.Erc20Balances)

   
    return(
        <></>        
    )
    }


export default UserWallet
