#!/bin/sh
#
echo "Setting up contracts and depositing tokens/nfts"
./setupContracts.sh


echo "Creating Proposals and populating votes"
./no-sunodo-prepare-demo.sh

