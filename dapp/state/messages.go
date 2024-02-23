package state

import (
	"github.com/ethereum/go-ethereum/common"
)

/// Native Messages:
// Deposit Erc20
// Deposit Erc721

/// Custom Messages:

type CreateOrg struct {
	NewOrgAddress common.Address
	AllowedTokens []common.Address
}

type CreateIssue struct {
	OrgAddress        common.Address
	Erc20Weights      []Erc20Weights
	Erc721Multipliers []Erc721Multipliers
	TallyingSystem    TallyingSystemId
	Ballot            []Policy
}

type CastVote struct {
	OrgAddress common.Address
	Issue      uint
	Policy     []uint
}

type CountVotes struct {
	OrgAddress common.Address
	Issue      uint
}

/// Data

type Erc20Weights struct {
	Address      common.Address
	Weight       uint64
	TimeWeighted bool
}

type Erc721Multipliers struct {
	Address    common.Address
	Multiplier uint64 // fixed-point number with 2 decimals (i.e. percentage).
}

type TallyingSystemId uint

const (
	SINGLE_CHOICE TallyingSystemId = iota
)

type Policy []byte
