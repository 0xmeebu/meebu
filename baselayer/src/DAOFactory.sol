
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./DAO.sol";

contract DAOFactory {
    event DAOCreated(address indexed daoAddress);

    function createDAO() public returns (address) {
        DAO newDAO = new DAO();
        emit DAOCreated(address(newDAO));

        return address(newDAO);
    }
}

