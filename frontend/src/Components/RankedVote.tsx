import { Group, TextInput, Box, Text, Code, Button, Center, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { Policy } from '../Interfaces';

interface RankedVoteProps {
        issueIndex: number;
        title: string;
        description: string;
        orgAddress: string;
        policies: Policy[]
  }
  

function RankedVote(props: RankedVoteProps) {
  const form = useForm({
    initialValues: {
      issueIndex: props.issueIndex,
      list: props.policies
    },
  });

  const castVoteInput = () => {
    console.log(JSON.stringify(form.values, null, 2))
  }

  const fields = form.values.list.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
          <Center {...provided.dragHandleProps}>
            <IconGripVertical color='#FF08FF' size="1.2rem" />
          </Center>
          <TextInput disabled {...form.getInputProps(`list.${index}.description`)} />
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
      <Button onClick={castVoteInput}> Cast Vote </Button>
    </Box>
    </>
  );
}

export default RankedVote