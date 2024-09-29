import { Button, useColorModeValue } from "@chakra-ui/react";
import { ethers } from "ethers";
import React from "react";
import useGlobalStore from "../state/store";
import NetworkErrorMessage from "./NetworkErrorMessage";

const HARDHAT_NETWORK_ID = "0x539";

// declare let window: any;

const ConnectWalletButton: React.FC = () => {
  const {
    setNetworkError,
    networkError,
    setCurrentConnection,
    currentConnection,
    setTransactionError,

    setTxBeingSent,
    setCurrentBalance,
    setIsOwner,
  } = useGlobalStore();
  const borderColor = useColorModeValue("black", "white");

  const _connectWallet = async () => {
    if (window.ethereum === undefined) {
      setNetworkError("Please install MetaMask!");
      return;
    }

    if (!(await _checkNetwork())) {
      return;
    }

    const [selectedAccount] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    await _initialize(ethers.getAddress(selectedAccount));

    window.ethereum.on(
      "accountsChanged",
      async ([newAccount]: [newAccount: string]) => {
        if (newAccount === undefined) {
          return _resetState();
        }

        await _initialize(ethers.getAddress(newAccount));
      }
    );

    window.ethereum.on("chainChanged", () => {
      _resetState();
    });
  };

  const _initialize = async (selectedAccount: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(selectedAccount);

    setCurrentConnection({
      ...currentConnection,
      provider,
      signer,
    });
  };

  const _checkNetwork = async (): Promise<boolean> => {
    const chosenChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (chosenChainId === HARDHAT_NETWORK_ID) {
      return true;
    }
    setNetworkError("Please connect to Hardhat network (localhost:8545)");
    return false;
  };

  const _resetState = () => {
    setNetworkError(undefined);
    setTransactionError(undefined);
    setTxBeingSent(false);
    setCurrentBalance(undefined);
    setIsOwner(false);
    setCurrentConnection({
      provider: undefined,
      signer: undefined,
    });
  };

  const _dismissNetworkError = () => {
    setNetworkError(undefined);
  };

  // const _dismissTransactionError = () => {
  //   setTransactionError(undefined);
  // };

  // const _getRpcErrorMessage = (error: any): string => {
  //   console.log(error);
  //   if (error.data) {
  //     return error.data.message;
  //   }
  //   return error.message;
  // };
  return (
    <div>
      <Button
        onClick={_connectWallet}
        variant="outline"
        borderWidth="2px"
        borderColor={borderColor}
      >
        Connect Wallet
      </Button>
      {networkError && (
        <NetworkErrorMessage
          message={networkError}
          dismiss={_dismissNetworkError}
        />
      )}
    </div>
  );
};
export default ConnectWalletButton;
