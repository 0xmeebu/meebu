package main

import (
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/gligneul/rollmelette"
	"github.com/stretchr/testify/suite"
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
	app := new(RootState)
	s.tester = rollmelette.NewTester(app)
}

func (s *MeebuSuite) TestCreateOrg() {
	input := `
	{
		"Method":"CreateOrg",
		"Body": {"NewOrgAddress":"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045","AllowedTokens":[]}
	}`
	result := s.tester.Advance(msgSender, []byte(input))
	s.Nil(result.Err)

	s.Len(result.Reports, 1)
	s.Equal(result.Reports[0].Payload, []byte("CreateOrg message received"))
}

func (s *MeebuSuite) TestCreateProposal() {
	input := `
	{
		"Method":"CreateProposal",
		"Body": {
			"Title":"title",
			"Description":"description",
			"OrgAddress":"0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A",
			"Erc20Weights":[{"Address":"0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A","Weight":11,"TimeWeighted":false}],
			"Erc721Multipliers":[{"Address":"0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A","Multiplier":42}],
			"TallyingSystem":0,
			"Ballot":[{"Description":"bananas","Voucher":"0xdeadbeef"}]
		}
	}`

	result := s.tester.Advance(msgSender, []byte(input))
	s.Nil(result.Err)

	s.Len(result.Reports, 1)
	s.Equal(result.Reports[0].Payload, []byte("CreateProposal message received"))
}

func (s *MeebuSuite) TestInspect() {}
