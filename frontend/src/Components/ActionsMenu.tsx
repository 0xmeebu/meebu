import { Group, Button } from '@mantine/core';
import SideDrawer from './SideDrawer';
import ProposalFormModal from './ProposalFormModal';

function ActionMenu() {
  return (
    <Group justify="flex-start" gap="sm">
      <SideDrawer/>
      <Button>Register DAO</Button>
      <ProposalFormModal />

    </Group>
  );
}

export default ActionMenu