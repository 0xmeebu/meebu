import { Anchor, Divider, Text, Space } from '@mantine/core';

import { IconPinned } from '@tabler/icons-react'

interface DaoDividerProps {
  label: string
  name: string
  imageURL: string
}

function DaoDivider(props: DaoDividerProps) {
  return (
    <Divider my="lg" size='sm' color='pink' label={<> <img src={props.imageURL} /> <Space w="xs" />  <Text c='pink' size='xl' fw={700}>{props.name}</Text>  <Space w="sm" /> </>} labelPosition="left" />


  );
}

export default DaoDivider
