// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Coinshitter {
    address public owner;
    uint256 public totalSupply = 1000000;

    constructor(uint256 _totalSupply) {
        owner = msg.sender;
        totalSupply = _totalSupply;
    }

    // get owner
    function getOwner() public view returns (address) {
        return owner;
    }
}
