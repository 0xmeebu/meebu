import { Divider, Text } from '@mantine/core';
import { IconPinned } from '@tabler/icons-react'

interface DaoDividerProps {
  label: string
}

function DaoDivider(props: DaoDividerProps) {
  return (
    <Divider my="lg" size='sm' color='pink' label={<> <IconPinned color='#FF08FF' />  <Text c='pink' size='sm' fw={700}>{props.label}</Text> </>} labelPosition="left" />

  );
}

export default DaoDivider
