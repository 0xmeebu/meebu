import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import RankedVote from './RankedVote';
import { Policy } from '../Interfaces';

interface RankedVoteModalProps {
  open: boolean;
  userVoted: boolean;
  issueIndex: number;
  issueTitle: string;
  issueDescription: string;
  issueOrgAddress: string;
  issueBallot: Policy[]
}

function RankedVoteModal(props: RankedVoteModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  let label
  if (props.open) {
    if (!props.userVoted) { label = "Vote" }
    else { label = "Already Voted" }
  } else { label = "Voting Finished" }

  return (
    <>
      <Modal size='500' opened={opened} onClose={close} title="Ranked Vote">
        <RankedVote ballot={props.issueBallot} issueIndex={props.issueIndex} title={props.issueTitle} description={props.issueDescription} orgAddress={props.issueOrgAddress} />
      </Modal>

      <Button disabled={!props.open || props.userVoted} fullWidth mt="md" radius="md" onClick={open}>{label}</Button>
    </>
  );
}

export default RankedVoteModal
