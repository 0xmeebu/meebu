import { Text, Stack, Title, List, Avatar, Divider, Paper, Accordion, Box } from '@mantine/core';
import RankedVoteModal from '../RankedVoteModal';
import { MeebuState, newUserProposalStatus, TokenInfo, TokenWeight } from '../../Interfaces';
import tallingSystemList from '../../Data/tallyingSystemList';
import tokens from "../../Data/tokenList";

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

function addInfo(t: Map<string, TokenWeight>): Map<string, TokenInfo> {
  let ret = new Map<string, TokenInfo>

  t.forEach((v, k, _m) => {
    ret.set(k, {
      address: k,
      weight: v.Weight,
      timeWeighted: v.TimeWeighted,
      label: null,
      uri: null,
    })
  })

  tokens.forEach(tl => {
    let t = ret.get(tl.value)
    if (t) {
      t.label = tl.label
      t.uri = tl.uri
    }
  })

  return ret
}

function ProposalCard(props: ProposalCardProps) {
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

  let erc20Weights = [...addInfo(new Map(Object.entries(proposal.Erc20Weights))).entries()].map(([x, y]) => {
    return (
      <Accordion.Item key={y.address} value={y.address}>
        <Accordion.Control icon={<Avatar src={y.uri} />}>{y.label || "unknown token"}</Accordion.Control>
        <Accordion.Panel>{y.address}</Accordion.Panel>
      </Accordion.Item>
    )
  })

  let ballot = Object.entries(proposal.Ballot).map(([x, y]) => {
    return (
      <List.Item key={x}>
        <Text fs={"xl"} style={underline}> {y.Description} </Text>
      </List.Item>
    )
  })

  let userInfo = newUserProposalStatus(proposal, props.state.Voters, "0xf39fd6e51aad88f6f4ce6ab8827279cfffb9226")

  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder maw={"55ch"} >
      <Stack>
        <Title order={1}> {proposal.Title} </Title>
        <Box color="pink" style={{ paddingLeft: "0.5em", borderLeft: "0.3rem solid pink" }}>
          <Text fw={200}> {proposal.Description} </Text>
        </Box>

        <Divider my="xs" />

        <Stack gap="xs">
          <Title order={2}> Governance Framework </Title>
          <Text fs={"xl"} style={underline}> {tallingSystemList[proposal.TallyingSystem].label} </Text>
          <Accordion chevronPosition="right" variant="contained">
            {erc20Weights}
          </Accordion>
        </Stack>

        <Stack gap="xs">
          <Title order={2}> Participation </Title>
          <Text> hasVoted {String(userInfo.hasVoted)} </Text>
          <Text> power {userInfo.power.toString()} </Text>
          <Text> total voters {userInfo.totalVoters} </Text>
          <Text> average power {userInfo.averagePower.toString()} </Text>
        </Stack>

        <Stack gap="xs">
          <Title order={2}> Ballot </Title>
          <List type="ordered">
            {ballot}
          </List>
        </Stack>

      </Stack>


      {proposal.Open && <RankedVoteModal issueOrgAddress={props.orgAddress} issueIndex={props.index} issueTitle={proposal.Title} issueDescription={proposal.Description} issueBallot={proposal.Ballot} />}

    </Paper >
  );
}

/*




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
