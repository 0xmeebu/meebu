import { Text, Stack, Title, List, Paper, Accordion, Box, Badge, Group } from '@mantine/core';
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
    return (
      <div>
        Loading...
      </div>
    );
  }

  const proposal = org.Proposals[props.index]
  if (!proposal) {
    return (
      <div>
        Loading...
      </div>
    );
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
            <Text> hasVoted {String(userInfo.hasVoted)} </Text>
            <Text> power {userInfo.power.toString()} </Text>
            <Text> total voters {userInfo.totalVoters} </Text>
            <Text> average power {userInfo.averagePower.toString()} </Text>
          </Stack>
        </Accordion>


      </Stack>

      <RankedVoteModal open={proposal.Open} userVoted={userInfo.hasVoted} issueOrgAddress={props.orgAddress} issueIndex={props.index} issueTitle={proposal.Title} issueDescription={proposal.Description} issueBallot={proposal.Ballot} />


    </Paper >
  );
}

/*


      {!proposal.Open && <RankedVoteModal issueOrgAddress={props.orgAddress} issueIndex={props.index} issueTitle={proposal.Title} issueDescription={proposal.Description} issueBallot={proposal.Ballot} />}

          <Text fs={"xl"} style={underline}> {tallingSystemList[proposal.TallyingSystem].label} </Text>

      <Group>
        <Title order={3}> Voting Strategy </Title>
        <Text fw={600} fs={"xl"} style={{ "text-decoration-color": "pink", "text-decoration-line": "underline", "text-decoration-thickness": "3px" }}> {tallingSystemList[proposal.TallyingSystem].label} </Text>
      </Group>

      <Group>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={700}>{proposal.Title}</Text>
          <Badge color="pink">{tallingSystemList[proposal.TallyingSystem].label}</Badge>
        </Group>
      </Group>


      <Text size="sm" c="dimmed">
        {proposal.Description}
      </Text>

      <Group gap="sm">
        <TokenWeights weights={new Map(Object.entries(proposal.Erc20Weights))} cat='Weight' />
        <TokenWeights weights={new Map(Object.entries(proposal.Erc721Multipliers))} cat='Multiplier' />
      </Group>
*/

export default ProposalCard
