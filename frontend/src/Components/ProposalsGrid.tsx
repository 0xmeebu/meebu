import { Grid } from '@mantine/core';
import IssueCard from './ProposalCard';
function ProposalsGrid() {

  const proposalsList = [
    {
      "title": "Community Park Renovation Project",
      "description": "Allocate funds to renovate the local community park, including upgrading playground equipment and adding more benches and green spaces.",
      "orgAddress": "0x4B8Cdb9CB66F383578dBE4981c5e47F19C398380",
      "tallyingSystem": "Simple Majority",
       "ERC20Weights": [
        {
          "address": "0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd",
          "weight": 12,
          "timeWeighted": false
        },
        {
          "address": "0x08d967bb0134F2d07f7cfb6E246680c53927DD30",
          "weight": 17,
          "timeWeighted": false
        },
        {
          "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          "weight": 0,
          "timeWeighted": false
        }
      ],
      "ERC721Weights": [
        {
          "address": "0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd",
          "weight": 12,
          "timeWeighted": false
        },
        {
          "address": "0x08d967bb0134F2d07f7cfb6E246680c53927DD30",
          "weight": 17,
          "timeWeighted": false
        },
        {
          "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          "weight": 0,
          "timeWeighted": false
        }
      ],
      "policies":  [
        {
          "description": "1ss",
          "vouchers": "sdsds"
        },
        {
          "description": "ffdsdsd",
          "vouchers": "sdsdsd"
        },
        {
          "description": "ssdsdsd",
          "vouchers": "sdsdsdsd"
        }
      ]

    },
    // {
    //   "title": "School Technology Upgrade Initiative",
    //   "description": "Invest in updating classroom technology such as interactive whiteboards and tablets to enhance the learning experience for students.",
    //   "orgAddress": "0xCaCC9810C97c21aB2A51bA2e3aA2c5EbeFd8dFE3",
    //   "tallyingSystem": "Ranked Choice Voting"
    // },
    // {
    //   "title": "Environmental Conservation Fund Allocation",
    //   "description": "Allocate a portion of the budget towards initiatives aimed at preserving local ecosystems and combating climate change.",
    //   "orgAddress": "0xD3a5BdD4Daf478d4aE837E3Dc5aD27329bDBEc07",
    //   "tallyingSystem": "Plurality Vote"
    // },
    // {
    //   "title": "Traffic Management Proposal",
    //   "description": "Implement measures to alleviate traffic congestion in downtown areas, such as adding bike lanes and improving public transportation.",
    //   "orgAddress": "0xf70bB5F1f17b615BeA52f3A3dfB6bCCeA5643dA1",
    //   "tallyingSystem": "Preference Voting"
    // },
    // {
    //   "title": "Youth Recreation Center Development",
    //   "description": "Build a new youth recreation center equipped with sports facilities, study rooms, and recreational activities for the community's youth.",
    //   "orgAddress": "0x8b4e7a16F57F22b5462a66544D106b5eC3DfA667",
    //   "tallyingSystem": "Instant Runoff Voting"
    // },
    // {
    //   "title": "Small Business Support Program",
    //   "description": "Establish a program to provide grants and resources to small local businesses to stimulate economic growth and job creation.",
    //   "orgAddress": "0x1A336d09E44D1FeCc9d8AcdaED72e27D4b65651B",
    //   "tallyingSystem": "Approval Voting"
    // },
    // {
    //   "title": "Public Health Initiative Funding",
    //   "description": "Allocate funds towards public health initiatives such as free vaccination drives, health education programs, and improving access to healthcare services.",
    //   "orgAddress": "0x20a57eC156ec27759e187cA30f7865188E2953F6",
    //   "tallyingSystem": "Cumulative Voting"
    // },
    // {
    //   "title": "Arts and Culture Promotion Grant",
    //   "description": "Create a grant program to support local artists and cultural events, fostering creativity and enriching community life.",
    //   "orgAddress": "0x3e4816EED4b18B15d1f2C6C69A2896B2c3d1b94D",
    //   "tallyingSystem": "Borda Count"
    // },
    // {
    //   "title": "Housing Affordability Initiative",
    //   "description": "Develop strategies to address housing affordability issues, including increasing affordable housing stock and implementing rent control measures.",
    //   "orgAddress": "0xAc7213a1dDe4f74D29E07Df86563A5B158A6fF47",
    //   "tallyingSystem": "Majority Judgment"
    // },
    // {
    //   "title": "Community Safety and Policing Reform",
    //   "description": "Propose reforms to law enforcement practices aimed at improving community relations, promoting accountability, and ensuring equitable policing.",
    //   "orgAddress": "0xEa92dD0a2d5B81F34a72c5B9A4b2C898DebFDF0B",
    //   "tallyingSystem": "Range Voting"
    // }
  ]
  
  return (
    <Grid>
{proposalsList.map((proposal, index) => (
      <Grid.Col span={4}><IssueCard index={index} orgAddress={proposal.orgAddress} title={proposal.title} tallyingSystem={proposal.tallyingSystem} description={proposal.description} erc20Weights={proposal.ERC20Weights} erc721Multipliers={proposal.ERC20Weights} policies={proposal.policies}></IssueCard></Grid.Col>
           ))}
    </Grid>
  );
}

export default ProposalsGrid