# Deploy and mint Meebu NFT for two accounts
echo "Deploying NFT and Mintind id0 and id1 to account index 0 and 1"
echo "Deploying using anvil id(7)"
forge script NFTDeployAndMint.s.sol --broadcast --rpc-url http://localhost:8545 --private-key 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356

# Approve spending for NFT id0
echo "Approve Spending, only works on NFT deployed at 0xef11D1c2aA48826D4c41e54ab82D1Ff5Ad8A64Ca"
cast send 0xef11D1c2aA48826D4c41e54ab82D1Ff5Ad8A64Ca 0x095ea7b3000000000000000000000000237f8dd094c0e47f4236f12b4fa01d6dae89fb870000000000000000000000000000000000000000000000000000000000000000 --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

