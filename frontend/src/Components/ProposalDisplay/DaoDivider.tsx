import { Anchor, Divider, Text, Space } from '@mantine/core';

import { IconPinned } from '@tabler/icons-react'

interface DaoDividerProps {
  label: string
  name: string
  imageURL: string
}

function DaoDivider(props: DaoDividerProps) {
  return (
    <Divider my="lg" size='sm' color='pink' label={<> <img src={props.imageURL} /> <Space w="xs" />  <Text c='pink' size='lg' fw={700}>{props.name}</Text>  <Space w="sm" /> <Anchor href={`https://etherscan.io/address/${props.label}`} style={{ color: 'grey' }}> at: {props.label} </Anchor> </>} labelPosition="left" />


  );
}

export default DaoDivider
