import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';
import { Input } from './Deposits';
import { useState } from "react";

function SideDrawer() {
  const [opened, { open, close }] = useDisclosure(false);
  const [dappAddress, setDappAddress] = useState<string>("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C"); 

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Wallet">
        <Input dappAddress={dappAddress} />
      </Drawer>

      <Button onClick={open} color='pink'>Wallet</Button>
    </>
  );
}

export default SideDrawer