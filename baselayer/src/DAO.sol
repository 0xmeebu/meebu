// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract DAO {

    struct Voucher {
        address target;
        bytes payload;
    }

    event PolicyExecuted(address indexed target, bool success);

    function executePolicy(bytes calldata _vouchers) public {
        Voucher[] memory vouchers = abi.decode(_vouchers, (Voucher[]));

        for (uint i = 0; i < vouchers.length; i++) {
            (bool succ, ) = (vouchers[i].target).call(vouchers[i].payload);

            require(succ, "Call failed, yo");
            emit PolicyExecuted(address indexed target, bool success);
        }
    }
}
