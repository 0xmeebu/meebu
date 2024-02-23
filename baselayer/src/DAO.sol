// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract DAO {

    struct Voucher {
        address target;
        bytes payload;
    }

    event PolicyExecuted(address target, bool success);

    function executePolicy(bytes calldata _vouchers) public {
        Voucher[] memory vouchers = abi.decode(_vouchers, (Voucher[]));

        for (uint i = 0; i < vouchers.length; i++) {
            Voucher memory v = vouchers[i];
            (bool succ, ) = (v.target).call(v.payload);

            require(succ, "Call failed, yo");
            emit PolicyExecuted(v.target, succ);
        }
    }
}
