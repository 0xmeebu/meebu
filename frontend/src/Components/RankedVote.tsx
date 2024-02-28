import { Group, TextInput, Box, Text, Button, Center, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { Policy } from '../Interfaces';

import NoWalletButton from './NoWalletButton';
import { useConnectWallet } from '@web3-onboard/react';

interface RankedVoteProps {
  issueIndex: number;
  title: string;
  description: string;
  orgAddress: string;
  ballot: Policy[]
}


function RankedVote(props: RankedVoteProps) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const form = useForm({
    initialValues: {
      orgAddress: props.orgAddress,
      issueIndex: props.issueIndex,
      list: props.ballot.map((v, k) => { return { policy: v, index: k } })
    },
  });

  const castVoteInput = () => {
    let preference = form.values.list.map((item) => item.index)
    let input = {
      Method: "CastVote",
      Body: {
        OrgAddress: props.orgAddress,
        Proposal: props.issueIndex,
        Preference: preference
      }
    }
    let _payload = JSON.stringify(input)

    console.log(JSON.stringify({ ...form.values, preference: preference }, null, 2))
    console.log("payload", JSON.stringify(input, null, 2))
  }

  const fields = form.values.list.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
          <Center {...provided.dragHandleProps}>
            <IconGripVertical color='#FF08FF' size="1.2rem" />
          </Center>
          <TextInput disabled {...form.getInputProps(`list.${index}.policy.Description`)} />
        </Group>
      )}
    </Draggable>
  ));

  return (
    <>
      <Stack
        align="flex-start"
        justify="flex-start"
        gap="xs">
        <Text size="sm" fs='italic'>{props.orgAddress}</Text>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={700}>{props.title}</Text>
        </Group>
        <Text size="sm" c="dimmed">
          {props.description}
        </Text>
      </Stack>

      <Box maw={500} mx="auto">
        <DragDropContext
          onDragEnd={({ destination, source }) =>
            destination?.index !== undefined && form.reorderListItem('list', { from: source.index, to: destination.index })
          }
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <br />
        {wallet && <Button onClick={castVoteInput}> Cast Vote </Button>}
        {!wallet && <NoWalletButton label="Cast Vote"></NoWalletButton>}
      </Box>
    </>
  );
}

export default RankedVote
