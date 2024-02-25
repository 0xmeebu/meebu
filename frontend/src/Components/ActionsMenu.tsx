import { Group, Button } from '@mantine/core';
import SideDrawer from './SideDrawer';
function ActionMenu() {
  return (
    <Group justify="flex-start" gap="sm">
      <SideDrawer/>
      <Button>Register DAO</Button>
      <Button>Create Proposal</Button>

    </Group>
  );
}

export default ActionMenu