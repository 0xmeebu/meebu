package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"

	"github.com/ethereum/go-ethereum/common"
	"github.com/gligneul/rollmelette"

	"dapp/state"
	"dapp/tally"
)

var OrgFactory = common.HexToAddress("0xfafafafafafafafafafafafafafafafafafafafa")

type RootState state.MeebuState

func (a *RootState) Advance(
	env rollmelette.Env,
	metadata rollmelette.Metadata,
	deposit rollmelette.Deposit,
	payload []byte,
) error {
	var message state.Message
	if err := json.Unmarshal(payload, &message); err != nil {
		return fmt.Errorf("failed to unmarshal input: %w", err)
	}

	switch message.Method {
	case state.CreateOrgMethod:
		var body state.CreateOrg
		if err := json.Unmarshal(message.Body, &body); err != nil {
			return fmt.Errorf("failed to unmarshal body: %w", err)
		}
		env.Report([]byte("CreateOrg message received"))

		if metadata.MsgSender != a.OrgFactory {
			return fmt.Errorf("CreateOrg msg.sender is not OrgFactory")
		}

		org := &state.Org{Proposals: make([]*state.Proposal, 0)}
		a.Orgs[body.NewOrgAddress] = org

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
			weights[w.Address] = state.Erc20Weight{Weight: w.Weight,
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
		var body state.CreateProposal
		if err := json.Unmarshal(message.Body, &body); err != nil {
			return fmt.Errorf("failed to unmarshal body: %w", err)
		}
		env.Report([]byte("CastVote message received"))

		// s := metadata.Sender

	}

	return nil
}

func (a *RootState) Inspect(env rollmelette.EnvInspector, payload []byte) error {
	return nil
}

func main() {
	fmt.Println("CALL MAINNN")
	app := RootState(*state.NewMeebu(OrgFactory))

	ctx := context.Background()
	opts := rollmelette.NewRunOpts()

	err := rollmelette.Run(ctx, opts, &app)
	if err != nil {
		slog.Error("application error", "error", err)
	}
}
