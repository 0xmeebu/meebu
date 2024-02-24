import { Group, Button } from '@mantine/core';
import SideDrawer from './SideDrawer';
function ActionMenu() {
  return (
    <Group justify="flex-start" gap="sm">
      <SideDrawer/>
      <Button variant="default">Register DAO</Button>
      <Button variant="default">Create Proposal</Button>

    </Group>
  );
}

export default ActionMenu