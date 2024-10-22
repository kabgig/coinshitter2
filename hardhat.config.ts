import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSC_SCAN_API_KEY!,
      baseSepolia: process.env.BASE_SCAN_API_KEY!,
      mainnet: "YOUR_ETHERSCAN_API_KEY",
      polygon: "YOUR_POLYGONSCAN_API_KEY",
      // Add other networks as needed
    },
  },
  networks: {
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    },
    bsc: {
      url: "https://api.bscscan.com/api",
    },
    polygon: {
      url: "https://polygon-rpc.com/",
    },
    basesepolia: {
      url: "https://sepolia.base.org",
    },
  },
};

export default config;
