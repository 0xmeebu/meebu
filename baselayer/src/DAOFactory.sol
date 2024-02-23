// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract DAOFactory {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }

    function incrementBy(uint n) public {
        number = number + n;
    }

}
