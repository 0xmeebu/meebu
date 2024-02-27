import { Group, Button } from '@mantine/core';
import SideDrawer from './SideDrawer/SideDrawer';
import ProposalFormModal from './ProposalFormModal';

function ActionMenu() {
  return (
    <Group justify="flex-start" gap="sm">
      <SideDrawer/>
      <Button>Create Community</Button>
      <ProposalFormModal />

    </Group>
  );
}

export default ActionMenu