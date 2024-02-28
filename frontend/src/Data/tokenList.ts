const tokenList = {"name":"1inch","timestamp":"2022-04-06T22:19:09+00:00","version":{"major":145,"minor":0,"patch":0},"keywords":["1inch","default","list"],"tokens":[
    
    {"address":"0xae7f61eCf06C65405560166b259C54031428A9C4","chainId":1,"name":"stETH","symbol":"stETH","decimals":18,"logoURI":"https://tokens.1inch.io/0xae7ab96520de3a18e5e111b5eaab095312d7fe84.png"},


    {"address":"0x95bD8D42f30351685e96C62EDdc0d0613bf9a87A","chainId":1,"name":"Spork","symbol":"SPORK","decimals":18,"logoURI":"../Images/spork.png"},


    {"address":"0xef11D1c2aA48826D4c41e54ab82D1Ff5Ad8A64Ca","chainId":1,"name":"Etherum Contributor 2024","symbol":"ETH_POAP","decimals":18,"logoURI":"../Images/eth_poap.svg"},



]}


const tokens = tokenList.tokens.map((token) => ({ label: token.symbol, value: token.address, uri: token.logoURI }));


export default tokens