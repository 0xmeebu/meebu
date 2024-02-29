#!/bin/sh
echo "DEPLOYING DAOFactory and setting MEEBU address"
./deployDAOFactoryAndCreateDAO.sh

echo "DEPLOYING NFT, MINTING AND DISTRIBUTING IT"
./deployMintAndDistributeNFT.sh

echo "DEPLOYING AND DISTRIBUTING DERC20"
./deployDERC20.sh

echo "DEPOSITING ERC20s to Portal"
./erc20deposit.sh

echo "DEPOSITING ERC721 to Portal"
./NFTdeposit.sh


echo "CREATING NEW COMMUNITIES"
./createManyCommunities.sh


