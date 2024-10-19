export type TokenInfo = {
  name: string;
  symbol: string;
  marketingFeeReceiver: string; // address in Solidity is represented as string in TypeScript
  devFeeReceiver: string;
  marketingTaxBuy: number; // uint256 in Solidity is represented as number or string in TypeScript
  marketingTaxSell: number;
  devTaxSell: number;
  devTaxBuy: number;
  lpTaxBuy: number;
  lpTaxSell: number;
  totalSupply: string; // BigInt values should be represented as string to avoid serialization issues
  maxPercentageForWallet: number;
  maxPercentageForTx: number;
  swapRouter: string;
  newOwner: string;
};
