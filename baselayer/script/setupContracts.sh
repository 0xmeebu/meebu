#!/bin/sh
echo "DEPLOYING DAOFactory and setting MEEBU address"
./deployDAOFactoryAndCreateDAO.sh

echo "DEPLOYING NFT, MINTING AND DISTRIBUTING IT"
./deployMintAndDistributeNFT.sh
