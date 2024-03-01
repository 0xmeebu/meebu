import { addInfo, addInfo2, addInfo3, MeebuState, newUserProposalStatus, TokenInfo, TokenWeight } from '../../Interfaces';
import tokens from "../../Data/tokenList";
import { useRollups } from '../../useRollups';
import DisplayWallet from '../DisplayWallet';
import { UseMeebuState } from "../../Hooks/UseMeebuState";
import { Loader } from '@mantine/core';

function UserWallet() {
  const { state, updating, error } = UseMeebuState();
  const rollups = useRollups();

  if (state === null || !rollups) {
    return (
      <Loader color="pink" type="dots" />
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


  return (
    <>
      <DisplayWallet balance={erc20Wallet} />
      <DisplayWallet balance={erc721Wallet} />
    </>
  )
}


export default UserWallet
