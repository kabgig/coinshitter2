const networkIds: Map<string, string> = new Map([
  ["0x539", "HARDHAT"],
  ["0x61", "BSC_TESTNET"],
  ["0x2105", "BASE_MAINNET"],
  ["0x14a34", "BASE_TESTNET_SEPOLIA"],
  ["0x38", "BSC_MAINNET"],
]);

const networkNames: Map<string, string> = new Map([
  ["0x539", "Hardhat"],
  ["0x61", "BSC Testnet"],
  ["0x2105", "BASE Mainnet"],
  ["0x14a34", "BASE Sepolia"],
  ["0x38", "BSC Mainnet"],
]);

const networkDecimalIds: Map<string, bigint> = new Map([
  ["BSC_TESTNET", 97n],
  ["BSC_MAINNET", 56n],
  ["HARDHAT", 1337n],
  ["BASE_MAINNET", 8453n],
  ["BASE_TESTNET_SEPOLIA", 84532n],
]);

export default networkIds;
export { networkNames, networkDecimalIds };
