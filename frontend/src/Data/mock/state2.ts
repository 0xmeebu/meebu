import { MeebuState } from "../../Interfaces"

export const state2: MeebuState = {
  OrgFactory: "0x7ef8e99980da5bcedcf7c10f41e55f759f6a174b",
  Orgs: {
    "0x61ab51be7c866a54b0b442c149d7715367743efd": {
      Proposals: [
        {
          Title: "Community Park Renovation Project",
          Description: "Allocate funds to renovate the local community park, including upgrading playground equipment and adding more benches and green spaces.",
          Erc20Weights: {
            "0xae7f61ecf06c65405560166b259c54031428a9c4": {
              "Weight": 11,
              "TimeWeighted": false
            }
          },
          Erc721Multipliers: {
            "0xef11d1c2aa48826d4c41e54ab82d1ff5ad8a64ca": {
              "Weight": 200,
              "TimeWeighted": false
            }
          },
          Ballot: [
            {
              Voucher: "3q2+7w==",
              Description: "Alocate to Parks and Recreations Inc"
            },
            {
              Voucher: "3q2+796tvu8=",
              Description: "Alocate to Dunder Mifflin"
            }
          ],
          TallyingSystem: 0,
          Open: true,
          HasVoted: {
            "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266": true
          }
        },
        {
          Title: "Community Park Renovation Project",
          Description: "Allocate funds to renovate the local community park, including upgrading playground equipment and adding more benches and green spaces.",
          Erc20Weights: {
            "0xae7f61ecf06c65405560166b259c54031428a9c4": {
              "Weight": 11,
              "TimeWeighted": false
            }
          },
          Erc721Multipliers: {
            "0xef11d1c2aa48826d4c41e54ab82d1ff5ad8a64ca": {
              "Weight": 200,
              "TimeWeighted": false
            }
          },
          Ballot: [
            {
              "Voucher": "3q2+7w==",
              "Description": "Alocate to Parks and Recreations Inc"
            },
            {
              "Voucher": "3q2+796tvu8=",
              "Description": "Alocate to Dunder Mifflin"
            }
          ],
          TallyingSystem: 0,
          Open: true,
          HasVoted: {
            "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266": true
          }
        }
      ]
    }
  },
  Voters: {
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266": {
      Erc20Balances: {
        "0xae7f61ecf06c65405560166b259c54031428a9c4": {
          Balance: "80",
        }
      },
      Erc721Owned: {}
    }
  }
}
