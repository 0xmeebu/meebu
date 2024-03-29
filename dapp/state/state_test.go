package state

import (
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/holiman/uint256"
	"github.com/stretchr/testify/assert"
)

var Erc20Address1 = common.HexToAddress("0xfafafafafafafafafafafafafafafafafafafafa")
var Erc20Address2 = common.HexToAddress("0xfafafafafafafafafafafafafafafafafafafafb")

var Erc721Address1 = common.HexToAddress("0xfafafafafafafafafafafafafafafafafafafafc")
var Erc721Address2 = common.HexToAddress("0xfafafafafafafafafafafafafafafafafafafafd")

func TestVotingPower(t *testing.T) {
	vb := NewVoter()
	vb.DepositErc20Token(Erc20Address1, uint256.NewInt(100))
	vb.DepositErc20Token(Erc20Address2, uint256.NewInt(200))
	vb.DepositErc721Token(Erc721Address1)
	vb.DepositErc721Token(Erc721Address2)

	weights := make(map[common.Address]TokenWeight)
	weights[Erc20Address1] = TokenWeight{2, false}
	weights[Erc20Address2] = TokenWeight{1, false}

	multipliers := make(map[common.Address]TokenWeight)
	multipliers[Erc721Address1] = TokenWeight{100, false}
	multipliers[Erc721Address1] = TokenWeight{150, false}

	assert.Equal(t, vb.VotingPower(weights, multipliers), uint256.NewInt(600))
}
