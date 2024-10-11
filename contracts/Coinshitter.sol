// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Coinshitter {
    address public owner;

    constructor() {
        owner = msg.sender;
    }
}
