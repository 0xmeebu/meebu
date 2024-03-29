import { useForm } from '@mantine/form';
import { useState } from 'react';
import { UseMeebuState } from "../Hooks/UseMeebuState";
import { NumberInput, Select, JsonInput, CloseButton, Switch, NativeSelect, Text, Box, Autocomplete, Stepper, Button, Group, TextInput, Textarea, Code, Loader } from '@mantine/core';
import tokens from '../Data/tokenList';
import AddInputButton from './AddInputButton';
import tallingSystemList from '../Data/tallyingSystemList';

function ProposalCreationForm() {
  const { state, updating, error } = UseMeebuState();
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const empty: { address: string, weight: number }[] = []
  const empty2: { address: string, multiplier: number }[] = []
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      orgAddress: '',
      ERC20Weights: empty,
      ERC721Weights: empty2,
      tallyingSystem: 0,
      ballot: [{
        description: '',
        voucher: ''
      }]
    },
  });

  if (state === null) {
    return (<Loader color="pink" type="dots" />)
  }
  const communities: string[] = Object.keys(state.Orgs)

  const newProposalInput = () => {
    let input = {
      Method: "CreateProposal",
      Body: {
        Title: form.values.title,
        Description: form.values.description,
        OrgAddress: form.values.orgAddress,
        Erc20Weights: form.values.ERC20Weights.map(f => {
          return {
            Address: f.address,
            Weight: f.weight,
            TimeWeighted: false,
          }
        }),
        Erc721Multipliers: form.values.ERC721Weights.map(f => {
          return {
            Address: f.address,
            Multiplier: f.multiplier + 100,
            TimeWeighted: false,
          }
        }),
        TallyingSystem: parseInt(tallingSystemList[form.values.tallyingSystem].value),
        Ballot: form.values.ballot.map(p => {
          return {
            Voucher: p.voucher || "0x",
            Description: p.description
          }
        })
      }
    }

    let payload = "0x" + Buffer.from(JSON.stringify(input)).toString("hex")
    return payload
  }

  const ERC20Fields = form.values.ERC20Weights.map((_item, index) => (
    <Group key={index} mt="xs">
      <Select
        data={tokens}
        searchable
        placeholder="Token Symbol"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`ERC20Weights.${index}.address`)}
      />
      <NumberInput
        placeholder="weight"
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

  const ERC721Fields = form.values.ERC721Weights.map((_item, index) => (
    <Group key={index} mt="xs">
      <Select
        data={tokens}
        searchable
        placeholder="Token Symbol"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`ERC721Weights.${index}.address`)}
      />
      <NumberInput
        placeholder="bonus"
        suffix="%"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`ERC721Weights.${index}.multiplier`)}
      />
      <Switch
        onLabel="Time Weighted" offLabel="Time Weighted" size='lg' color='pink'
        {...form.getInputProps(`ERC721Weights.${index}.timeWeighted`, { type: 'checkbox' })}
      />
      <CloseButton onClick={() => form.removeListItem('ERC721Weights', index)}>
      </CloseButton>
    </Group>
  ));

  const policyFields =

    form.values.ballot.map((_item, index) => (
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
          {...form.getInputProps(`ballot.${index}.voucher`)}
        />
        <CloseButton onClick={() => form.removeListItem('ballot', index)}>
        </CloseButton>
      </Group>
    ));





  return (
    <>
      <Stepper active={active} color='pink'>
        <Stepper.Step label="First step" description="Profile settings">
          <Autocomplete
            label="Community Address"
            placeholder="Community"
            data={communities}
            {...form.getInputProps('orgAddress')}
          />
          <TextInput label="Title" placeholder="what is the proposal deciding about" {...form.getInputProps('title')} />
          <Textarea label="Description" placeholder="Detail your proposal" {...form.getInputProps('description')} />
        </Stepper.Step>

        <Stepper.Step label="Voting system" description="Governance settings">

          <NativeSelect
            label="Select Voting System"
            data={tallingSystemList}
          />

          <h3>ERC20 Voting Tokens</h3>
          <Box maw={500} mx="auto">
            {ERC20Fields.length > 0 ? (
              <Group mb="xs">

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
                  form.insertListItem('ERC20Weights', { address: '', weight: 0, timeWeighted: false })
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
                  form.insertListItem('ERC721Weights', { address: '', weight: 0 })
                }
              >
                Add NFT
              </Button>
            </Group>
          </Box>

        </Stepper.Step>

        <Stepper.Step label="Set policies" description="Options to be voted">

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
                  form.insertListItem('ballot', { description: '', voucher: '' })
                }
              >
                Add Policy
              </Button>
            </Group>
          </Box>
        </Stepper.Step>
        <Stepper.Completed>
          Review and Submit
          <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code>

        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
        {active == 3 && <AddInputButton label="Submit Proposal" payload={newProposalInput()} />}
      </Group>
    </>
  );
}

export default ProposalCreationForm
