package main

import (
	"fmt"
)

type WeightedVote struct {
	Vote   []int
	Weight int
}

func main() {
	votes := []WeightedVote{
		{Vote: []int{1, 2, 3}, Weight: 2},
		{Vote: []int{2, 1, 3}, Weight: 300},
		{Vote: []int{2, 3, 1}, Weight: 1},
		{Vote: []int{1, 2, 3}, Weight: 3},
		{Vote: []int{3, 1, 2}, Weight: 2},
	}
	winner := rankedVotingWithWeights(votes)
	fmt.Printf("The winner is: %d\n", winner)
}

func rankedVotingWithWeights(votes []WeightedVote) int {
	totalVotes := 0
	for _, vote := range votes {
		totalVotes += vote.Weight
	}
	majority := totalVotes/2 + 1

	for {
		// Count first-choice votes with weights
		counts := make(map[int]int)
		for _, vote := range votes {
			if len(vote.Vote) > 0 {
				firstChoice := vote.Vote[0]
				counts[firstChoice] += vote.Weight
			}
		}

		// Check for a majority
		for candidate, count := range counts {
			if count >= majority {
				return candidate
			}
		}

		// Find the candidate with the fewest votes
		lowest := findLowest(counts)

		// Remove the candidate with the fewest votes from each ballot
		for i := range votes {
			votes[i].Vote = removeCandidate(votes[i].Vote, lowest)
		}
	}
}

func findLowest(counts map[int]int) int {
	lowestCount := -1
	var lowestCandidate int
	for candidate, count := range counts {
		if lowestCount == -1 || count < lowestCount {
			lowestCount = count
			lowestCandidate = candidate
		}
	}
	return lowestCandidate
}

func removeCandidate(vote []int, candidate int) []int {
	var newVote []int
	for _, v := range vote {
		if v != candidate {
			newVote = append(newVote, v)
		}
	}
	return newVote
}

