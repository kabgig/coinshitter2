// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Coinshitter {
    address public owner;
    address public marketingAddress;
    uint256 public totalSupply = 9;

    struct TokenInfo {
        string name;
        string symbol;
        address marketingFeeReceiver;
        address devFeeReceiver;
        uint256 marketingTaxBuy;
        uint256 marketingTaxSell;
        uint256 devTaxSell;
        uint256 devTaxBuy;
        uint256 lpTaxBuy;
        uint256 lpTaxSell;
        uint256 totalSupply;
        uint256 maxPercentageForWallet;
        uint256 maxPercentageForTx;
        address swapRouter;
        address newOwner;
    }

    address public devAddress;
    uint256 public marketingTaxBuy;
    uint256 public marketingTaxSell;
    uint256 public devTaxSell;
    uint256 public devTaxBuy;
    uint256 public lpTaxBuy;
    uint256 public lpTaxSell;
    uint256 public maxPercentageForWallet;
    uint256 public maxPercentageForTx;
    address public swapRouter;
    address public newOwner;
    uint256 public deployerTax;
    address public deployFeeReceiver;

    constructor(
        TokenInfo memory _tokenInfo,
        uint256 _deployerTax,
        address _deployFeeReceiver
    ) {
        owner = msg.sender;
        totalSupply = _tokenInfo.totalSupply;
        marketingAddress = _tokenInfo.marketingFeeReceiver;
        devAddress = _tokenInfo.devFeeReceiver;
        marketingTaxBuy = _tokenInfo.marketingTaxBuy;
        marketingTaxSell = _tokenInfo.marketingTaxSell;
        devTaxSell = _tokenInfo.devTaxSell;
        devTaxBuy = _tokenInfo.devTaxBuy;
        lpTaxBuy = _tokenInfo.lpTaxBuy;
        lpTaxSell = _tokenInfo.lpTaxSell;
        maxPercentageForWallet = _tokenInfo.maxPercentageForWallet;
        maxPercentageForTx = _tokenInfo.maxPercentageForTx;
        swapRouter = _tokenInfo.swapRouter;
        newOwner = _tokenInfo.newOwner;
        deployerTax = _deployerTax;
        deployFeeReceiver = _deployFeeReceiver;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
