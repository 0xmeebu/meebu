// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract DAO {

    struct voucher {
        address target;
        bytes payload;
    }

    function executePolicy(bytes _vouchers) public {
        voucher[] vouchers = abi.decode(_vouchers, voucher[]);

        for (uint i = 0; i < vouchers.length; i++) {
            (bool succ, ) = (vouchers[i].target).call(vouchers[i].payload);
        }
    }
}
