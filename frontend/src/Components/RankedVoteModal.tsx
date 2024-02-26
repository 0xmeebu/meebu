import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import RankedVote from './RankedVote';
import { Policy } from '../Interfaces';

interface RankedVoteModalProps {
  issueIndex: number;
  issueTitle: string;
  issueDescription: string;
  issueOrgAddress: string;
  issuePolicies: Policy[]
}

function RankedVoteModal(props: RankedVoteModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  
  return (
    <>
      <Modal size='auto' opened={opened} onClose={close} title="Ranked Vote">
        <RankedVote policies={props.issuePolicies} issueIndex={props.issueIndex} title={props.issueTitle} description={props.issueDescription} orgAddress={props.issueOrgAddress}/>
      </Modal>

      <Button fullWidth mt="md" radius="md" onClick={open}>Vote</Button>
    </>
  );
}

export default RankedVoteModal