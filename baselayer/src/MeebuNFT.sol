// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MeebuNFT is ERC721 {
    uint counter;
    constructor() ERC721("MeebuNFT", "MNFT") {
    }

    function mint(address to) public {
        _mint(to, counter);
        counter++;
    }
}
