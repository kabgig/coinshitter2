// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Coinshitter {
    address public owner;
    address public marketingAddress;
    uint256 public totalSupply = 9;

    constructor(uint256 _totalSupply, address _marketingAddress) {
        owner = msg.sender;
        totalSupply = _totalSupply;
        marketingAddress = _marketingAddress;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
