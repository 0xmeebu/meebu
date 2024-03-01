const tokenList = {
  "name": "1inch", "timestamp": "2022-04-06T22:19:09+00:00", "version": { "major": 145, "minor": 0, "patch": 0 }, "keywords": ["1inch", "default", "list"], "tokens": [

    { "address": "0xae7f61ecf06c65405560166b259c54031428a9c4", "chainId": 1, "name": "stETH", "symbol": "stETH", "decimals": 18, "logoURI": "https://tokens.1inch.io/0xae7ab96520de3a18e5e111b5eaab095312d7fe84.png" },


    { "address": "0x95bd8d42f30351685e96c62eddc0d0613bf9a87a", "chainid": 1, "name": "spork", "symbol": "SPORK", "decimals": 18, "logoURI": "spork.png" },


    { "address": "0xef11d1c2aa48826d4c41e54ab82d1ff5ad8a64ca", "chainId": 1, "name": "Etherum Contributor 2024", "symbol": "GitPOAP", "decimals": 18, "logoURI": "eth_poap.svg" },



  ]
}

const tokens = tokenList.tokens.map((token) => { return { label: token.symbol, value: token.address, uri: token.logoURI } });

export default tokens
