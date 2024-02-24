import { Grid } from '@mantine/core';
import IssueCard from './ProposalCard';
function ProposalsGrid() {
  return (
    <Grid>
      <Grid.Col span={4}><IssueCard orgAddress="0x2ed2834388dfd" title="Hey" tallyingSystem='Ranked Voting' description='With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway'></IssueCard></Grid.Col>

    </Grid>
  );
}

export default ProposalsGrid