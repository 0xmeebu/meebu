package state

import (
	"github.com/ethereum/go-ethereum/common"
	"github.com/holiman/uint256"

	"dapp/tally"
)

//
// Meebu root State
//

type MeebuState struct {
	// Config
	OrgFactory common.Address

	// Data
	Orgs   map[common.Address]*Org
	Voters Voters
}

//
// Voter Data
//

type Voters map[common.Address]*VoterBalance

type VoterBalance struct {
	// ERC20 address => balance
	Erc20Balances map[common.Address]*Erc20Balance

	// ERC721 address => has NFT of that "kind"
	Erc721Owned map[common.Address]bool
}

type Erc20Balance struct {
	// Total balance
	Balance uint256.Int

	// Deposits, for time-weighted voting
	Deposits []Erc20TokenDeposit
}

type Erc20TokenDeposit struct {
	Value     uint256.Int
	Timestamp uint64
}

//
// Org Data
//

type Org struct {
	// configs
	Erc20Tokens  map[common.Address]bool
	Erc721Tokens map[common.Address]bool

	//
	Proposals []Proposal
}

type Proposal struct {
	// Metadata
	Created int64

	// Config
	Erc20Weights      map[common.Address]uint64
	Erc721Multipliers map[common.Address]uint64
	Ballot            []Policy
	TallyingSystem    TallyingSystemId

	// State
	Tally    tally.OrdinalTally
	Open     bool
	HasVoted map[common.Address]bool
}
