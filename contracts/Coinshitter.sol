// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Coinshitter {
    uint public number;
    address public owner;

    event Withdrawal(uint amount, uint when);

    constructor() {
        owner = msg.sender;
    }

    function setNumber(uint _number) public {
        number = _number;
    }
}
