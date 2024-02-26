package main

import (
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/gligneul/rollmelette"
	"github.com/stretchr/testify/suite"

	"dapp/state"
)

var msgSender = common.HexToAddress("0xfafafafafafafafafafafafafafafafafafafafa")
var erc20 = common.HexToAddress("0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A")
var erc721 = common.HexToAddress("0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134B")

func TestMeebuSuite(t *testing.T) {
	suite.Run(t, new(MeebuSuite))
}

type MeebuSuite struct {
	suite.Suite
	tester *rollmelette.Tester
}

func (s *MeebuSuite) SetupTest() {
	app := RootState(*state.NewMeebu(msgSender))
	s.tester = rollmelette.NewTester(&app)
}

func (s *MeebuSuite) TestMeebuOrg() {
	createOrgInput := `
	{
		"Method":"CreateOrg",
		"Body": {"NewOrgAddress":"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045","AllowedTokens":[]}
	}`
	result := s.tester.Advance(msgSender, []byte(createOrgInput))
	s.Nil(result.Err)

	s.Len(result.Reports, 1)
	s.Equal(result.Reports[0].Payload, []byte("CreateOrg message received"))

	createProposalInput := `
	{
		"Method":"CreateProposal",
		"Body": {
			"Title":"title",
			"Description":"description",
			"OrgAddress":"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
			"Erc20Weights":[{"Address":"0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A","Weight":11,"TimeWeighted":false}],
			"Erc721Multipliers":[{"Address":"0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134B","Multiplier":200}],
			"TallyingSystem":0,
			"Ballot":[{"Description":"bananas","Voucher":"0xdeadbeef"},{"Description":"bananas2","Voucher":"0xdeadbeefdeadbeef"}]
		}
	}`

	result = s.tester.Advance(msgSender, []byte(createProposalInput))
	s.Nil(result.Err)

	s.Len(result.Reports, 1)
	s.Equal(result.Reports[0].Payload, []byte("CreateProposal message received"))

	result = s.tester.DepositERC20(erc20, msgSender, big.NewInt(100), []byte(""))
	s.Nil(result.Err)

	result = depositERC721(s.tester, erc721, msgSender, big.NewInt(2), []byte(""))
	s.Nil(result.Err)

	castVoteInput := `
	{
		"Method":"CastVote",
		"Body": {
			"OrgAddress":"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
			"Proposal":0,
			"Preference":[1,0]
		}
	}`
	result = s.tester.Advance(msgSender, []byte(castVoteInput))
	s.Nil(result.Err)

	s.Len(result.Reports, 2)
	s.Equal(result.Reports[0].Payload, []byte("CastVote message received"))

	countVotesInput := `
	{
		"Method":"CountVotes",
		"Body": {
			"OrgAddress":"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
			"Proposal":0
		}
	}`
	result = s.tester.Advance(msgSender, []byte(countVotesInput))
	s.Nil(result.Err)

	s.Len(result.Reports, 2)
	s.Len(result.Vouchers, 1)
	s.Equal(result.Reports[0].Payload, []byte("CountVotes message received"))
}

func (s *MeebuSuite) TestInspect() {}

// DepositERC20 simulates an advance input from the ERC20 portal.
func depositERC721(
	t *rollmelette.Tester,
	token common.Address,
	msgSender common.Address,
	tokenId *big.Int,
	payload []byte,
) rollmelette.TestAdvanceResult {
	const bits = 256
	one := big.NewInt(1)
	MaxUint256 := new(big.Int).Sub(new(big.Int).Lsh(one, bits), one)
	if tokenId.Cmp(MaxUint256) >= 0 {
		panic("value too big")
	} else if tokenId.Cmp(big.NewInt(0)) < 0 {
		panic("negative value")
	}

	portalPayload := make([]byte, 0, 1+common.AddressLength+2*common.HashLength+len(payload))
	portalPayload = append(portalPayload, token[:]...)
	portalPayload = append(portalPayload, msgSender[:]...)
	portalPayload = append(portalPayload, tokenId.FillBytes(make([]byte, common.HashLength))...)
	portalPayload = append(portalPayload, payload...)
	return t.Advance(t.Book().ERC721Portal, portalPayload)
}
