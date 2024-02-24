package tally

import (
	"fmt"
	"github.com/holiman/uint256"
)

type RankedTally struct {
	TotalPolicies uint

	TotalVotes *uint256.Int
	Votes      []*Vote
}

type Vote struct {
	Preferences []uint
	Power       *uint256.Int
}

func NewRankedTally(totalPolicies uint) RankedTally {
	votes := make([]*Vote, 0, 256)
	return RankedTally{totalPolicies, uint256.NewInt(0), votes}
}

func (t *RankedTally) AddVote(preferences []uint, power *uint256.Int) error {
	for _, p := range preferences {
		if p >= t.TotalPolicies {
			return fmt.Errorf("Policy %d is out of bounds; there are %d policies", p, t.TotalPolicies)
		}
	}

	v := Vote{preferences, power}
	t.Votes = append(t.Votes, &v)
	t.TotalVotes.Add(t.TotalVotes, power)

	return nil
}

func (t *RankedTally) CloseVoting() uint {
	majority := t.TotalVotes.Clone()
	majority.Rsh(majority, 1)
	majority.Add(majority, uint256.NewInt(1))

	for {
		// Count first-choice votes with weights
		counts := make([]*uint256.Int, t.TotalPolicies)
		for i := range counts {
			counts[i] = uint256.NewInt(0)
		}

		for _, vote := range t.Votes {
			if len(vote.Preferences) > 0 {
				firstChoice := vote.Preferences[0]
				counts[firstChoice].Add(counts[firstChoice], vote.Power)
			}
		}

		// Check for a majority
		for candidate, count := range counts {
			if count.Cmp(majority) >= 0 {
				return uint(candidate)
			}
		}

		// Find the candidate with the fewest votes
		lowest := findLowest(counts)

		// Remove the candidate with the fewest votes from each ballot
		for i := range t.Votes {
			t.Votes[i].Preferences = removeCandidate(t.Votes[i].Preferences, lowest)
		}
	}
}

func findLowest(counts []*uint256.Int) uint {
	lowestCount := uint256.NewInt(0)
	lowestCount.Sub(lowestCount, uint256.NewInt(1))

	var lowestCandidate uint
	for candidate, count := range counts {
		if count.Cmp(lowestCount) == -1 {
			lowestCount = count
			lowestCandidate = uint(candidate)
		}
	}

	return lowestCandidate
}

func removeCandidate(preferences []uint, candidate uint) []uint {
	var newVote []uint
	for _, v := range preferences {
		if v != candidate {
			newVote = append(newVote, v)
		}
	}
	return newVote
}
