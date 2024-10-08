import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
  },
  networks: {
    hardhat: {
      chainId: 1337,
      initialBaseFeePerGas: 0,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/g3JAH8UZidGZFeYcpCBinmeVMbZmWCSO`,
      // accounts: [
      //   "99fdef4007a835d87cf0c09055d4f4c32ff799180dc53b26ec199ae5b7292b68",
      // ],
    },
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      // accounts: [
      //   "0x99967df96284d8edaf1cfa6e614efbb435d64d7ba0585a47ef50ea4bca4078a0",
      // ],
    },
  },
};

export default config;
