import { Group, Button } from '@mantine/core';
import SideDrawer from './SideDrawer/SideDrawer';
import ProposalFormModal from './ProposalFormModal';
import NoWalletButton from './NoWalletButton';
import { useConnectWallet } from '@web3-onboard/react';



function ActionMenu() {
  const [{ wallet }] = useConnectWallet();
  return (
    <Group justify="flex-start" gap="sm">
      <SideDrawer/>
      <Button>Create Community</Button>
      {!wallet && <NoWalletButton label="Create Proposal"></NoWalletButton>}
      {wallet && <ProposalFormModal />}

    </Group>
  );
}

export default ActionMenu