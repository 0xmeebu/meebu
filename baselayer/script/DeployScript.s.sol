// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/DAOFactory.sol";

contract DeployScript is Script {
    IInputBox inputBox = IInputBox(address(0x59b22D57D4f067708AB0c00552767405926dc768));

    function run() external {
        vm.startBroadcast(); // Start a transaction broadcast

        new DAOFactory(inputBox);

        vm.stopBroadcast(); // Stop broadcasting transactions
    }
}

