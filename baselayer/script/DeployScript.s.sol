// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/DAOFactory.sol";

contract DeployScript is Script {
    IInputBox inputBox = IInputBox(address(1));

    function run() external {
        vm.startBroadcast(); // Start a transaction broadcast

        new DAOFactory(inputBox);

        vm.stopBroadcast(); // Stop broadcasting transactions
    }
}

