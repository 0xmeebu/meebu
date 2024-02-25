
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./DAO.sol";

interface IInputBox {
    function addInput(
        address _dapp,
        bytes calldata _input
    ) external returns (bytes32);
}

contract DAOFactory {

    IInputBox internal immutable inputBox;
    address meebu;

    event DAOCreated(address indexed daoAddr);

    constructor(IInputBox _inputBox) {
        inputBox =  _inputBox;
    }

    // can only be set once
    function setMeebuAddress(address _meebu) public {
        require(meebu == address(0), "meebu address already set");
        meebu = _meebu;

    }

    function createDAO(address _owner) public returns (address) {
        DAO newDAO = new DAO(meebu);

        address daoAddr = address(newDAO);

        // the input is the DAO address and it's owner
        bytes memory payload = abi.encode(daoAddr, _owner);

        inputBox.addInput(meebu, payload);

        emit DAOCreated(address(newDAO));

        return address(newDAO);
    }
}

