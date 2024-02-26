import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';
import { Input } from './Deposits';
import { useState } from "react";

import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import NoWalletButton from '../NoWalletButton';

function SideDrawer() {
  const [opened, { open, close }] = useDisclosure(false);
  const [dappAddress, setDappAddress] = useState<string>("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C"); 
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  return (
    <>
      <Drawer opened={opened} onClose={close}>
        <Input dappAddress={dappAddress} />
      </Drawer>

      {wallet && <Button onClick={open} color='pink'>Stake to Vote</Button>}
      {!wallet && <NoWalletButton label="Connect Wallet"></NoWalletButton>}

    </>
  );
}

export default SideDrawer