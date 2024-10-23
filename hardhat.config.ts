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
      bsc: process.env.BSC_SCAN_API_KEY!,
      baseSepolia: process.env.BASE_SCAN_API_KEY!,
      base: process.env.BASE_SCAN_API_KEY!,
      polygon: process.env.POLYGON_SCAN_API_KEY!,
    },
  },
  networks: {
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    },
    bsc: {
      url: "https://bsc-dataseed1.binance.org/",
    },
    polygon: {
      url: "https://polygon-rpc.com/",
    },
    basesepolia: {
      url: "https://sepolia.base.org/",
    },
    base: {
      url: "https://mainnet.base.org/",
    },
  },
};

export default config;
