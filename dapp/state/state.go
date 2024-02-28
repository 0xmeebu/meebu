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

func NewMeebu(orgFactory common.Address) *MeebuState {
	return &MeebuState{
		OrgFactory: orgFactory,
		Orgs:       make(map[common.Address]*Org),
		Voters:     make(map[common.Address]*VoterBalance),
	}
}

func (s *MeebuState) Voter(address common.Address) *VoterBalance {
	voter, ok := s.Voters[address]
	if !ok {
		voter = NewVoter()
		s.Voters[address] = voter
	}

	return voter
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

func (v *VoterBalance) Erc20Balance(address common.Address) *Erc20Balance {
	balance, ok := v.Erc20Balances[address]
	if !ok {
		balance = &Erc20Balance{
			Balance:  uint256.NewInt(0),
			Deposits: make([]Erc20TokenDeposit, 0),
		}
		v.Erc20Balances[address] = balance
	}

	return balance
}

type Erc20Balance struct {
	// Total balance
	Balance *uint256.Int

	// Deposits, for time-weighted voting
	Deposits []Erc20TokenDeposit
}

type Erc20TokenDeposit struct {
	Value     *uint256.Int
	Timestamp uint64
}

func NewVoter() *VoterBalance {
	return &VoterBalance{make(map[common.Address]*Erc20Balance), make(map[common.Address]bool)}
}

func (vb *VoterBalance) DepositErc20Token(address common.Address, amount *uint256.Int) {
	b, ok := vb.Erc20Balances[address]
	if !ok {
		vb.Erc20Balances[address] = &Erc20Balance{amount, make([]Erc20TokenDeposit, 0)}
	} else {
		b.Balance.Add(b.Balance, amount)
	}
}

func (vb *VoterBalance) DepositErc721Token(address common.Address) {
	vb.Erc721Owned[address] = true
}

func (vb *VoterBalance) VotingPower(
	weights map[common.Address]TokenWeight,
	multipliers map[common.Address]TokenWeight) *uint256.Int {
	power := uint256.NewInt(0)

	for address, weight := range weights {
		w := uint256.NewInt(weight.Weight)
		balance := vb.Erc20Balance(address).Balance
		w.Mul(w, balance)
		power.Add(power, w)
	}

	for address, multiplier := range multipliers {
		if vb.Erc721Owned[address] {
			m := uint256.NewInt(multiplier.Weight)
			power.Mul(power, m)
			power.Div(power, uint256.NewInt(100))
		}
	}

	return power
}

//
// Org Data
//

type Org struct {
	// configs
	// Erc20Tokens  map[common.Address]bool
	// Erc721Tokens map[common.Address]bool

	//
	Proposals []*Proposal
}

type Proposal struct {
	// Metadata
	// Created int64
	Title       string
	Description string

	// Config
	Erc20Weights      map[common.Address]TokenWeight
	Erc721Multipliers map[common.Address]TokenWeight
	Ballot            []Policy
	TallyingSystem    TallyingSystemId

	// State
	Tally    tally.OrdinalTally
	Open     bool
	HasVoted map[common.Address]bool
}

type TokenWeight struct {
	Weight       uint64
	TimeWeighted bool
}
