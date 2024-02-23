
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
    address immutable meebu;

    event DAOCreated(address indexed daoAddr);

    constructor(address _meebu, IInputBox _inputBox) {
        inputBox =  _inputBox;
        meebu = _meebu;
    }

    function createDAO() public returns (address) {
        DAO newDAO = new DAO();
        address daoAddr = address(newDAO);
        bytes memory payload = abi.encode(daoAddr);

        inputBox.addInput(meebu, payload);

        emit DAOCreated(address(newDAO));

        return address(newDAO);
    }
}

