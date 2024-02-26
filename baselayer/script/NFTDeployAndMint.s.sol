// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/MeebuNFT.sol";

contract DeployScript is Script {

    function run() external {
        vm.startBroadcast(); // Start a transaction broadcast

        // Deploy meebu NFT
        MeebuNFT meebuNFT = new MeebuNFT();
        meebuNFT.mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        meebuNFT.mint(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);

        vm.stopBroadcast(); // Stop broadcasting transactions
    }
}

