# meebu

## How to deploy/interact with the DAOFactory:

Disclaimer: this is for testing purposes, avoid using your real private key or running
this on mainnet

Step 0:
Start Nonodo/sunodo:
```
cd dapp
make dev
```
or
```
cd dapp
sunodo build
sunodo run

```
Step 1:
There is a deployment script on baselayer/script/.
Run:

```
cd baselayer
forge script script/DeployScript.s.sol --broadcast --rpc-url http://localhost:8545 --private-key $PRIVATE-KEY
```

If you're using Anvil, you can use it's first generated account for testing:
```
forge script script/DeployScript.s.sol --broadcast --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Step 2:
With the DAOFactory deployed, set meebu address:

```
cast send $DAO-FACTORY-ADDRESS "setMeebuAddress(address)" $MEEBU-ADDRESS --rpc-url http://localhost:8545 --private-key $PRIVATE-KEY
```
Or, using the Anvil hardcoded addresses and the nonodo/sunodo default addresses for accounts and dapps:

```
cast send 0x59b670e9fA9D0A427751Af201D676719a970857b "setMeebuAddress(address)" 0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Step 3:
To create a DAO, create the data for the function call:
cast calldata "createDAO(address)" $OWNER-ADDRESS

Using Anvil's first account:
```
cast calldata "createDAO(address)" "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
```
Send the transcation:
```
cast send 0x59b670e9fA9D0A427751Af201D676719a970857b $ENCODED_FROM_PREVIOUS_STEP --rpc-url http://localhost:8545 --private-key <private-key>
```
Example:
```
cast send 0x59b670e9fA9D0A427751Af201D676719a970857b 0x131773d6000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266 --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

You should now see and input arrive at nonodo/sunodo.

