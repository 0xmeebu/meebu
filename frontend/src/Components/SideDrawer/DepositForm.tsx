import { Fieldset, NumberInput, TextInput } from '@mantine/core';

function DepositForm() {
  return (
    <Fieldset legend="Personal information">
      <TextInput label="Token Address" placeholder="0x0" />
      <NumberInput label="Amount" placeholder="0.0" mt="md" />
    </Fieldset>
  );
}