#!/bin/sh

# Deploy DAO Factory using index (6) on anvil
forge script DeployScript.s.sol --broadcast --rpc-url http://localhost:8545 --private-key 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e

# Set Meebu Address
cast send 0x7ef8E99980Da5bcEDcF7C10f41E55f759F6A174B "setMeebuAddress(address)" 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# Create DAO
cast send 0x7ef8E99980Da5bcEDcF7C10f41E55f759F6A174B 0x131773d6000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266 --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
