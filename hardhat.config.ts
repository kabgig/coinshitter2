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
    bnbtestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    },
  },
};

export default config;
