package tally

import (
	"github.com/holiman/uint256"
)

type OrdinalTally interface {
	AddVote(preferences []uint, power uint256.Int)
	CloseVoting() uint
}
