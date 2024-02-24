// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract DAO is AccessControl {
    bytes32 public constant MEEBU_ROLE = keccak256("MEEBU_ROLE");

    struct Voucher {
        address target;
        bytes payload;
    }

    event PolicyExecuted(address target, bool success);

    constructor(address _meebu) {
        // give meebu the meebu role
        // so that it can execute policies
        _grantRole(MEEBU_ROLE, _meebu);
    }

    function executePolicy(bytes calldata _vouchers) public onlyRole(MEEBU_ROLE) {
        Voucher[] memory vouchers = abi.decode(_vouchers, (Voucher[]));

        for (uint i = 0; i < vouchers.length; i++) {
            Voucher memory v = vouchers[i];
            (bool succ, ) = (v.target).call(v.payload);

            require(succ, "Call failed, yo");
            emit PolicyExecuted(v.target, succ);
        }
    }
}
