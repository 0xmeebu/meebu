import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import ProposalCreationForm from './ProposalCreationForm';

function ProposalFormModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Proposal">
        <ProposalCreationForm />
      </Modal>

      <Button onClick={open}>Create Proposal</Button>
    </>
  );
}

export default ProposalFormModal