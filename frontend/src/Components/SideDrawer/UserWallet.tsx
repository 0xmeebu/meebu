import { addInfo, addInfo2, addInfo3, MeebuState, newUserProposalStatus, TokenInfo, TokenWeight } from '../../Interfaces';
import tokens from "../../Data/tokenList";
import { useRollups } from '../../useRollups';
import DisplayWallet from '../DisplayWallet';
import { UseMeebuState } from "../../Hooks/UseMeebuState";

export interface TokenBalance {
  Balance: number;
}

function UserWallet() {
  const { state, updating, error } = UseMeebuState();
  const rollups = useRollups();

  if (state === null || !rollups) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const user = state.Voters[rollups.userAddress]
  console.log("WWW1", user)


  let erc20Wallet = [...addInfo2(new Map(Object.entries(user.Erc20Balances))).entries()].map(([_x, y]) => {
    return (
      y
    )
  })

  console.log("ERC20", erc20Wallet)

  let erc721Wallet = [...addInfo3(new Map(Object.entries(user.Erc721Owned))).entries()].map(([_x, y]) => {
    return (
      y
    )
  })
  console.log("ERC721", erc721Wallet)



  const l = []


  // let erc20Balances = [...addInfo(state.Voters[wallet].Erc20Balances)].map(([x, y]) => {
  //   return (
  //     y
  //   )
  // })

  // const w = state.Voters[wallet]

  // console.log(w.Erc20Balances)


  return (
    <></>
  )
}


export default UserWallet
