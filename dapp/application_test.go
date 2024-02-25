package main

import (
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/gligneul/rollmelette"
	"github.com/stretchr/testify/suite"

	"dapp/state"
)

var msgSender = common.HexToAddress("0xfafafafafafafafafafafafafafafafafafafafa")

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
			"Erc721Multipliers":[{"Address":"0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A","Multiplier":42}],
			"TallyingSystem":0,
			"Ballot":[{"Description":"bananas","Voucher":"0xdeadbeef"}]
		}
	}`

	result = s.tester.Advance(msgSender, []byte(createProposalInput))
	s.Nil(result.Err)

	s.Len(result.Reports, 1)
	s.Equal(result.Reports[0].Payload, []byte("CreateProposal message received"))
}

func (s *MeebuSuite) TestInspect() {}
