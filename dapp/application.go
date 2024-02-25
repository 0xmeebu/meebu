package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"

	"github.com/gligneul/rollmelette"

	"dapp/state"
)

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

	case state.CreateProposalMethod:
		var body state.CreateProposal
		if err := json.Unmarshal(message.Body, &body); err != nil {
			return fmt.Errorf("failed to unmarshal body: %w", err)
		}
		env.Report([]byte("CreateProposal message received"))

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
	ctx := context.Background()
	opts := rollmelette.NewRunOpts()
	app := new(RootState)
	err := rollmelette.Run(ctx, opts, app)
	if err != nil {
		slog.Error("application error", "error", err)
	}
}
