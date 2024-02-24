package tally

import (
	"fmt"
	"testing"

	"github.com/holiman/uint256"
)

func TestRankedVote(t *testing.T) {
	rankedTally := NewRankedTally(3)

	rankedTally.AddVote([]uint{0, 2, 3}, uint256.NewInt(2))
	rankedTally.AddVote([]uint{1, 1, 3}, uint256.NewInt(300))
	rankedTally.AddVote([]uint{1, 3, 1}, uint256.NewInt(1))
	rankedTally.AddVote([]uint{0, 2, 3}, uint256.NewInt(3))
	rankedTally.AddVote([]uint{2, 1, 2}, uint256.NewInt(2))

	winner := rankedTally.CloseVoting()
	fmt.Printf("The winner is: %d\n", winner)
}
