./create-spork-dao-proposals.sh
./create-eco-chain-proposals.sh
./create-silent-chain-proposals.sh
./create-cgp-proposals.sh

echo "CAST VOTE for MEEBU ACC  1, 2, 3 (ANVIL STARTS AS 0, the Hero)"
cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C 0x7b224d6574686f64223a2243617374566f7465222c22426f6479223a7b224f726741646472657373223a22307836314162353162453743383636613534423042343432633134396437373135333637373433456644222c2250726f706f73616c223a302c22507265666572656e6365223a5b312c305d7d7d --rpc-url http://localhost:8545 --private-key 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C 0x7b224d6574686f64223a2243617374566f7465222c22426f6479223a7b224f726741646472657373223a22307836314162353162453743383636613534423042343432633134396437373135333637373433456644222c2250726f706f73616c223a302c22507265666572656e6365223a5b312c305d7d7d --rpc-url http://localhost:8545 --private-key 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C 0x7b224d6574686f64223a2243617374566f7465222c22426f6479223a7b224f726741646472657373223a22307836314162353162453743383636613534423042343432633134396437373135333637373433456644222c2250726f706f73616c223a302c22507265666572656e6365223a5b312c305d7d7d --rpc-url http://localhost:8545 --private-key 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6

echo "CAST VOTE for MEEBU ACC 4, 5, and 6"

cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C 0x7b224d6574686f64223a2243617374566f7465222c22426f6479223a7b224f726741646472657373223a22307836314162353162453743383636613534423042343432633134396437373135333637373433456644222c2250726f706f73616c223a302c22507265666572656e6365223a5b302c315d7d7d  --rpc-url http://localhost:8545 --private-key 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a

cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C 0x7b224d6574686f64223a2243617374566f7465222c22426f6479223a7b224f726741646472657373223a22307836314162353162453743383636613534423042343432633134396437373135333637373433456644222c2250726f706f73616c223a302c22507265666572656e6365223a5b302c315d7d7d  --rpc-url http://localhost:8545 --private-key 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba

cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C 0x7b224d6574686f64223a2243617374566f7465222c22426f6479223a7b224f726741646472657373223a22307836314162353162453743383636613534423042343432633134396437373135333637373433456644222c2250726f706f73616c223a302c22507265666572656e6365223a5b302c315d7d7d  --rpc-url http://localhost:8545 --private-key 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e

#echo "COUNT VOTE"
#cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C 0x7b224d6574686f64223a22436f756e74566f746573222c22426f6479223a7b224f726741646472657373223a22307836314162353162453743383636613534423042343432633134396437373135333637373433456644222c2250726f706f73616c223a307d7d --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
