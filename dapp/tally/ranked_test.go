package tally

import (
	"fmt"
	"testing"

	"github.com/holiman/uint256"
)

func TestRankedVote(t *testing.T) {
	rankedTally := NewRankedTally(3)

	if err := rankedTally.AddVote([]uint{0, 2, 1}, uint256.NewInt(1)); err != nil {
		panic(err)
	}
	if err := rankedTally.AddVote([]uint{1, 0, 2}, uint256.NewInt(1)); err != nil {
		panic(err)
	}
	if err := rankedTally.AddVote([]uint{1, 0, 2}, uint256.NewInt(1)); err != nil {
		panic(err)
	}
	if err := rankedTally.AddVote([]uint{2, 1, 2}, uint256.NewInt(1)); err != nil {
		panic(err)
	}
	if err := rankedTally.AddVote([]uint{2, 0, 1}, uint256.NewInt(1)); err != nil {
		panic(err)
	}

	winner := rankedTally.CloseVoting()
	fmt.Printf("The winner is: %d\n", winner)
}
