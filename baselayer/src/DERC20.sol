// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract DERC20 is ERC20 {
    constructor() ERC20("DERC20", "DERC") {
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
