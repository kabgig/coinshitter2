import { ethers } from "ethers";

// Check if MetaMask is installed
export const isMetaMaskInstalled = () => {
  return typeof window.ethereum !== "undefined";
};

// Request MetaMask account access
export const connectMetaMask = async () => {
  if (isMetaMaskInstalled()) {
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      return { accounts, provider, signer };
    } catch (error) {
      console.error("User rejected the request", error);
    }
  } else {
    console.error("MetaMask is not installed");
  }
};
