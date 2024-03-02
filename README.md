# Meebu

## Running the demo:

Disclaimer: this is for testing purposes, avoid using your real private key or running
this on mainnet

### Requirements:
yarn:
https://yarnpkg.com/getting-started/install

nonodo or sunodo:
https://github.com/gligneul/nonodo
https://github.com/sunodo/sunodo

### Step by Step:
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
In another terminal window:
```
cd frontend/
yarn
cp webpack.config.js node_modules/react-scripts/config/
yarn codegen && yarn start
```

Step 2:
Run the script the setup the demo:

```
cd baselayer/script/
./setup_meebu_demo.sh
```
