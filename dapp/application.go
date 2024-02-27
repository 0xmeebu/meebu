package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"

	"github.com/ethereum/go-ethereum/common"
	"github.com/gligneul/rollmelette"
	"github.com/holiman/uint256"

	"dapp/state"
	"dapp/tally"
)

var OrgFactory = common.HexToAddress("0x7ef8E99980Da5bcEDcF7C10f41E55f759F6A174B")

type RootState state.MeebuState

func (a *RootState) inner() *state.MeebuState {
	return (*state.MeebuState)(a)
}

func (a *RootState) Advance(
	env rollmelette.Env,
	metadata rollmelette.Metadata,
	deposit rollmelette.Deposit,
	payload []byte,
) error {
	// ERC20 deposits
	if deposit != nil {
		switch deposit := deposit.(type) {
		case *rollmelette.ERC20Deposit:
			sender := deposit.Sender
			voter := a.inner().Voter(sender)
			amount, _ := uint256.FromBig(deposit.Amount)
			voter.DepositErc20Token(deposit.Token, amount)

		// case *rollmelette.EtherDeposit: // The input is from the Ether portal
		default:
			return fmt.Errorf("unsupported deposit: %T", deposit)
		}

		return nil
	}

	// ERC721 deposits
	if metadata.MsgSender == rollmelette.NewAddressBook().ERC721Portal {
		token, sender, err := parseErc721Deposit(payload)
		if err != nil {
			return err
		}

		voter := a.inner().Voter(*sender)
		voter.DepositErc721Token(*token)

		env.Report([]byte(fmt.Sprintf("ERC721 `%s` deposited by `%s`", token, sender)))
		return nil
	}

	// DAO creation
	if metadata.MsgSender == a.inner().OrgFactory {
		newOrg, err := parseCreateOrg(payload)
		if err != nil {
			return err
		}

		org := &state.Org{Proposals: make([]*state.Proposal, 0)}
		a.Orgs[*newOrg] = org

		env.Report([]byte(fmt.Sprintf("New org created with address `%s`", newOrg)))

		return nil
	}

	// Custom Messages
	var message state.Message
	if err := json.Unmarshal(payload, &message); err != nil {
		return fmt.Errorf("failed to unmarshal input: %w", err)
	}

	switch message.Method {
	case state.CreateProposalMethod:
		var body state.CreateProposal
		if err := json.Unmarshal(message.Body, &body); err != nil {
			return fmt.Errorf("failed to unmarshal body: %w", err)
		}
		env.Report([]byte("CreateProposal message received"))

		org, ok := a.Orgs[body.OrgAddress]
		if !ok {
			return fmt.Errorf("Org `%s` doesn't exist", body.OrgAddress)
		}

		weights := make(map[common.Address]state.Erc20Weight)
		for _, w := range body.Erc20Weights {
			weights[w.Address] = state.Erc20Weight{
				Weight:       w.Weight,
				TimeWeighted: w.TimeWeighted,
			}
		}

		multipliers := make(map[common.Address]uint64)
		for _, m := range body.Erc721Multipliers {
			multipliers[m.Address] = m.Multiplier
		}

		proposal := state.Proposal{
			Title:             body.Title,
			Description:       body.Description,
			Erc20Weights:      weights,
			Erc721Multipliers: multipliers,
			Ballot:            body.Ballot,
			TallyingSystem:    body.TallyingSystem,
			Tally:             tally.NewRankedTally(uint(len(body.Ballot))),
			Open:              true,
			HasVoted:          make(map[common.Address]bool),
		}

		org.Proposals = append(org.Proposals, &proposal)

	case state.CastVoteMethod:
		var body state.CastVote
		if err := json.Unmarshal(message.Body, &body); err != nil {
			return fmt.Errorf("failed to unmarshal body: %w", err)
		}
		env.Report([]byte("CastVote message received"))

		org, ok := a.inner().Orgs[body.OrgAddress]
		if !ok {
			return fmt.Errorf("Org `%s` doesn't exist", body.OrgAddress)
		}

		if body.Proposal >= uint(len(org.Proposals)) {
			return fmt.Errorf("Proposal `%d` doesn't exist", body.Proposal)
		}

		proposal := org.Proposals[body.Proposal]
		if !proposal.Open {
			return fmt.Errorf("Proposal %d is closed", body.Proposal)
		}

		sender := metadata.MsgSender
		voter := a.inner().Voter(sender)

		if proposal.HasVoted[sender] {
			return fmt.Errorf("Voter `%s` has already voted", sender)
		}

		power := voter.VotingPower(proposal.Erc20Weights, proposal.Erc721Multipliers)
		err := proposal.Tally.AddVote(body.Preference, power)
		if err != nil {
			return fmt.Errorf("Failed to cast vote of `%s` with preferences `%v`: %s", sender, body.Preference, err)
		}

		proposal.HasVoted[sender] = true
		env.Report([]byte(fmt.Sprintf("Voter `%s` with power `%s` has voted with `%v`", sender, power.String(), body.Preference)))

	case state.CountVotesMethod:
		var body state.CountVotes
		if err := json.Unmarshal(message.Body, &body); err != nil {
			return fmt.Errorf("failed to unmarshal body: %w", err)
		}
		env.Report([]byte("CountVotes message received"))

		org, ok := a.inner().Orgs[body.OrgAddress]
		if !ok {
			return fmt.Errorf("Org `%s` doesn't exist", body.OrgAddress)
		}

		if body.Proposal >= uint(len(org.Proposals)) {
			return fmt.Errorf("Proposal `%d` doesn't exist", body.Proposal)
		}

		proposal := org.Proposals[body.Proposal]
		if !proposal.Open {
			return fmt.Errorf("Proposal %d is closed", body.Proposal)
		}

		winnerIndex := proposal.Tally.CloseVoting()
		winner := proposal.Ballot[winnerIndex]

		env.Voucher(body.OrgAddress, winner.Voucher)
		proposal.Open = false
		env.Report([]byte(fmt.Sprintf("Org `%s` finished proposal `%d`, winner is id `%d` with content `%v`", body.OrgAddress, body.Proposal, winnerIndex, winner.Voucher)))
	}

	return nil
}

func (a *RootState) Inspect(env rollmelette.EnvInspector, payload []byte) error {
	return nil
}

func main() {
	app := RootState(*state.NewMeebu(OrgFactory))

	ctx := context.Background()
	opts := rollmelette.NewRunOpts()

	err := rollmelette.Run(ctx, opts, &app)
	if err != nil {
		slog.Error("application error", "error", err)
	}
}

func parseCreateOrg(payload []byte) (*common.Address, error) {
	if len(payload) < 32+32 {
		return nil, fmt.Errorf("invalid createDao message size; got %v", len(payload))
	}

	daoAddress := common.BytesToAddress(payload[:32])
	return &daoAddress, nil
}

func parseErc721Deposit(payload []byte) (*common.Address, *common.Address, error) {
	if len(payload) < 20+20+32 {
		return nil, nil, fmt.Errorf("invalid erc721 deposit size; got %v", len(payload))
	}

	token := common.BytesToAddress(payload[:20])
	payload = payload[20:]
	sender := common.BytesToAddress(payload[:20])
	return &token, &sender, nil
}
