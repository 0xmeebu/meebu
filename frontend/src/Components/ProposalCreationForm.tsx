import { useForm } from '@mantine/form';
import { useState } from 'react';
import {JsonInput, CloseButton, Switch, ActionIcon, NativeSelect, Text, Box, Autocomplete, Stepper, Button, Group, TextInput, Textarea ,PasswordInput, Code } from '@mantine/core';
function ProposalCreationForm() {

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      orgAddress: '',
      ERC20Weights: [{
                    address: '',
                    weight: 0,
                    timeWeighted: false,
      }],
      ERC721Weights:  [{
        address: '',
        multiplier: 0
}],
      tallyingSystem: 0,
      ballot: [{
        description: '',
        vouchers: ''
      }]
    },
  });

  const daoList = [
    "0x7dF16aE462EAe1dAeC8d7b281780EFe98663528F",
    "0x5F1bC2D1dA7a51B77B1Fa27a6Cb12e112Abd5eA3",
    "0xCcD7f456eF5321F5bCDE5f09e2dB88979f5e0f1D",
    "0x4E3FaA295BD85031FdCc0E5A42b593Ce3eBcfB56",
    "0x1e857b4985FC9a6e5d9b9B2C2d8E7747Df27b020",
    "0x4b4a439D53395D74D105A2e16f1d8f0D90b6bC56"
  ];
  
  const tallingSystemList = [
    { label: 'Ranked Voting', value:  '0'},
    { label: 'Simple Majority', value: '1', disabled: true },
  ];


const ERC20Fields = form.values.ERC20Weights.map((item, index) => (
    <Group key={index} mt="xs">
      <TextInput
        placeholder="0x0"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`ERC20Weights.${index}.address`)}
      />
      <TextInput
        placeholder="0.0"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`ERC20Weights.${index}.weight`)}
      />
      <Switch
        onLabel="Time Weighted" offLabel="Time Weighted" size='lg' color='pink'
        {...form.getInputProps(`ERC20Weights.${index}.timeWeighted`, { type: 'checkbox' })}
      />
      <CloseButton onClick={() => form.removeListItem('ERC20Weights', index)}>
      </CloseButton>
    </Group>
  ));

  const ERC721Fields = form.values.ERC721Weights.map((item, index) => (
    <Group key={index} mt="xs">
      <TextInput
        placeholder="0x0"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`ERC721Weights.${index}.address`)}
      />
      <TextInput
        placeholder="0.0"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`ERC721Weights.${index}.weight`)}
      />
      <CloseButton  onClick={() => form.removeListItem('ERC721Weights', index)}>
      </CloseButton>
    </Group>
  ));

  const policyFields =
    
    form.values.ballot.map((item, index) => (
    <Group key={index} mt="xs">
      <TextInput
        placeholder="Policy Statement"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`ballot.${index}.description`)}
      />
       <JsonInput
      label="Base layer side efects"
      placeholder="[{'0x0', 'transfer(address, uint)', [0x1, 1000]}]"
      validationError="Invalid JSON"
      formatOnBlur
      autosize
      minRows={4}
      {...form.getInputProps(`ballot.${index}.vouchers`)}
    />
      <CloseButton  onClick={() => form.removeListItem('ballot', index)}>
      </CloseButton>
    </Group>
  ));
    



  
return (
<>
<h1>Create Proposal</h1>
<h2>General Information</h2>
<Autocomplete
      label="Dao Address"
      placeholder="Pick the DAO"
      data={daoList}
      {...form.getInputProps('orgAddress')}
    />
  <TextInput label="Title" placeholder="what is the proposal deciding about" {...form.getInputProps('title')} />
  <Textarea label="Description" placeholder="Detail your proposal" {...form.getInputProps('description')} />
  
  <h2>Governance Model</h2>

  <h3>Voting System</h3>
  <NativeSelect
      label="Select Voting System"
      data={tallingSystemList}
    />

<h3>ERC20 Voting Tokens</h3>
<Box maw={500} mx="auto">
      {ERC20Fields.length > 0 ? (
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            Token Address
          </Text>
          
        </Group>
      ) : (
        <Text c="dimmed">
          No one here...
        </Text>
      )}

      {ERC20Fields}

      <Group justify="flex-start" mt="md">
        <Button color='pink'
          onClick={() =>
            form.insertListItem('ERC20Weights', { name: '', weight: 0, timeWeighted: false})
          }
        >
          Add Token
        </Button>
      </Group>

    </Box>


    <h3>NFT Multipliers</h3>

    <Box maw={500} mx="auto">
      {ERC721Fields.length > 0 ? (
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            Token Address
          </Text>
          
        </Group>
      ) : (
        <Text c="dimmed">
          No one here...
        </Text>
      )}

      {ERC721Fields}

      <Group justify="flex-start" mt="md">
        <Button color='pink'
          onClick={() =>
            form.insertListItem('ERC721Weights', { name: '', weight: 0})
          }
        >
          Add NFT
        </Button>
      </Group>      
</Box>


    <h2>Set Policies</h2>

    <Box maw={500} mx="auto">
      {policyFields.length > 0 ? (
        <Group mb="xs">

        </Group>
      ) : (
        <Text c="dimmed">
          No one here...
        </Text>
      )}

      {policyFields}

      <Group justify="flex-start" mt="md">
      <Button color='pink'
          onClick={() =>
            form.insertListItem('ballot', { description: '', vouchers: ''})
          }
        >
          Add Policy
        </Button>
      </Group>      
      </Box>



      <Text size="sm" fw={500} mt="md">
        Form values:
      </Text>
    <Code block>{JSON.stringify(form.values, null, 2)}</Code>


</>
  );
}

export default ProposalCreationForm