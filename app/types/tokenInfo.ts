export type TokenInfo = {
  name: string;
  symbol: string;
  marketingFeeReceiver: string; // address in Solidity is represented as string in TypeScript
  devFeeReceiver: string;
  marketingTaxBuy: string; // uint256 in Solidity is represented as number or string in TypeScript
  marketingTaxSell: string;
  devTaxSell: string;
  devTaxBuy: string;
  lpTaxBuy: string;
  lpTaxSell: string;
  totalSupply: string; // BigInt values should be represented as string to avoid serialization issues
  maxPercentageForWallet: string;
  maxPercentageForTx: string;
  swapRouter: string;
  newOwner: string;
};

export type DeployedTokenInfo = {
  date: string;
  deployedContract: string;
  deployerAddress: string;
  network: string;
  contractUrl: string;
  tokenSymbol: string;
  tokenName: string;
  totalSupply: number;
  decimals: number;
};
