package state

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"github.com/ethereum/go-ethereum/common"
)

//
// Native Messages:
//

// Deposit Erc20
// Deposit Erc721

//
// Custom Messages:
//

type Method string

const (
	CreateOrgMethod      Method = "CreateOrg"
	CreateProposalMethod Method = "CreateProposal"
	CastVoteMethod       Method = "CastVote"
)

type Message struct {
	Method Method
	Body   json.RawMessage
}

//
// Custom Advance Messages Definition
//

type CreateOrg struct {
	NewOrgAddress common.Address
	// AllowedTokens []common.Address
}

type CreateProposal struct {
	Title             string
	Description       string
	OrgAddress        common.Address
	Erc20Weights      []Erc20Weights
	Erc721Multipliers []Erc721Multipliers
	TallyingSystem    TallyingSystemId
	Ballot            []Policy
}

type CastVote struct {
	OrgAddress common.Address
	Proposal   uint
	Policy     []uint
}

type CountVotes struct {
	OrgAddress common.Address
	Proposal   uint
}

//
// Auxiliary Data
//

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
	RANKED_VOTING TallyingSystemId = iota
	SINGLE_CHOICE TallyingSystemId = iota
)

type Policy struct {
	Voucher     PolicyVoucher
	Description string
}

type PolicyVoucher []byte

func (h *PolicyVoucher) UnmarshalJSON(data []byte) error {
	var s string
	if err := json.Unmarshal(data, &s); err != nil {
		return err
	}

	if s[0:2] != "0x" {
		return fmt.Errorf("Malformed hex string, doesn't start with '0x': %s", s)
	}

	decoded, err := hex.DecodeString(s[2:])
	if err != nil {
		return err
	}
	*h = PolicyVoucher(decoded)
	return nil
}

//
// Custom Inspect Messages:
//
