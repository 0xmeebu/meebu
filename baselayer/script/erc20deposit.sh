#!/bin/sh

# Give approval for ERC20 Portal to spend tokens on behalf of first Anvil acc
cast send 0xae7f61eCf06C65405560166b259C54031428A9C4 0x095ea7b30000000000000000000000009C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB00000000000000000000000000000000000000000000000ffffffffffff0ffff --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
#
# Run the sunodo command to send ERC20 tokens
sunodo send erc20 --chain-id 31337 -r http://127.0.0.1:8545 --mnemonic-index 0 --dapp 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C --token 0xae7f61eCf06C65405560166b259C54031428A9C4 --amount 1

