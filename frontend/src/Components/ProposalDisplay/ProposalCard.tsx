import { Text, Stack, Title, List, Paper, Accordion, Box, Badge, Group, Loader } from '@mantine/core';
import RankedVoteModal from '../RankedVoteModal';
import { addInfo, MeebuState, newUserProposalStatus, TokenInfo, TokenWeight } from '../../Interfaces';
import tallingSystemList from '../../Data/tallyingSystemList';
import { useRollups } from '../../useRollups';
import DisplayWallet from '../DisplayTokenWeights';

interface ProposalCardProps {
  state: MeebuState;
  index: number;
  orgAddress: string;
}

const underline = {
  textDecorationColor: "pink",
  textDecorationLine: "underline",
  textDecorationThickness: "3px",
  textUnderlineOffset: "4px"
}

function ProposalCard(props: ProposalCardProps) {
  const rollups = useRollups();

  const org = props.state.Orgs[props.orgAddress]
  if (!org) {
    return (<Loader color="pink" type="dots" />)
  }

  const proposal = org.Proposals[props.index]
  if (!proposal) {
    return (<Loader color="pink" type="dots" />)
  }

  console.log(proposal)

  let erc20Weights = [...addInfo(new Map(Object.entries(proposal.Erc20Weights))).entries()].map(([_x, y]) => {
    return (
      y
    )
  })
  let erc721Weights = [...addInfo(new Map(Object.entries(proposal.Erc721Multipliers))).entries()].map(([_x, y]) => {
    return (
      y
    )
  })
  let ballot = proposal.Ballot.map((v, k) => {
    return (
      <List.Item key={k}>
        <Group>
          <Text fs={"xl"} style={underline}> {v.Description} </Text>
          {(!proposal.Open && proposal.WinnerIndex === k) &&
            <Badge color="pink">{"winner"}</Badge>
          }
        </Group>
      </List.Item>
    )
  })

  let userInfo = newUserProposalStatus(proposal, props.state.Voters, rollups?.userAddress || null)


  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder miw={"55ch"} maw={"55ch"} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
      <Stack>
        <Title order={1}> {proposal.Title} </Title>
        <Badge color={proposal.Open ? "pink" : "grey"}>{proposal.Open ? "open" : "finished"}</Badge>
        <Box color="blue" style={{ paddingLeft: "0.5em", borderLeft: "0.3rem solid pink" }}>
          <Text fw={200}> {proposal.Description} </Text>
        </Box>

        <Stack gap="xs">
          <Title order={2}> Governance Framework </Title>
          <Text fw={600} size={"xl"} style={underline}> {tallingSystemList[proposal.TallyingSystem].label} </Text>
          <DisplayWallet Erc20Weights={erc20Weights} unitLabel='Weight' />
          <DisplayWallet Erc20Weights={erc721Weights} unitLabel='Bonus' suffix='%' />
        </Stack>


        <Stack gap="xs">
          <Title order={2}> Ballot </Title>
          <List type="ordered">
            {ballot}
          </List>
        </Stack>

        <Accordion transitionDuration={0}>
          <Stack gap="xs">
            <Title order={2}> Participation </Title>

            <Group>
              <Text size="lg" fw={600}> Your Voting Power </Text>
              <Text size="lg" style={underline}> {userInfo.power.toString()} </Text>
            </Group>


            <Group>
              <Text size="lg" fw={600}> Total Voting Power Cast </Text>
              <Text size="lg" style={underline}> {userInfo.totalPower} </Text>
              {userInfo.totalVoters != 0 &&
                <Text fs="italic" fw={200}> (avg. {userInfo.averagePower} per vote) </Text>
              }
            </Group>
          </Stack>
        </Accordion>


      </Stack>

      <RankedVoteModal open={proposal.Open} userVoted={userInfo.hasVoted} issueOrgAddress={props.orgAddress} issueIndex={props.index} issueTitle={proposal.Title} issueDescription={proposal.Description} issueBallot={proposal.Ballot} />


    </Paper >
  );
}

export default ProposalCard
