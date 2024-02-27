#!/bin/sh

# Give approval for NFT Portal to spend tokens on behalf of first Anvil acc
cast send 0xef11D1c2aA48826D4c41e54ab82D1Ff5Ad8A64Ca 0x095ea7b3000000000000000000000000237f8dd094c0e47f4236f12b4fa01d6dae89fb870000000000000000000000000000000000000000000000000000000000000000 --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# Run the sunodo command to send NFT tokens
sunodo send erc721 --chain-id 31337 -r http://127.0.0.1:8545 --mnemonic-index 0 --dapp 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C --token 0xef11D1c2aA48826D4c41e54ab82D1Ff5Ad8A64Ca --tokenId 0

