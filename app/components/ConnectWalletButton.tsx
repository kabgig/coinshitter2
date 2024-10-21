import { Button, useColorModeValue } from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import useGlobalStore from "../state/store";
import NetworkErrorMessage from "./NetworkErrorMessage";
import networkIds from "../configs/networkIds";

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
    setCurrentWalletNetwork,
  } = useGlobalStore();
  const borderColor = useColorModeValue("black", "white");
  const [isRequestPending, setIsRequestPending] = useState(false);

  useEffect(() => {
    const savedConnection = localStorage.getItem("currentConnection");
    if (savedConnection) {
      const parsedConnection = JSON.parse(savedConnection);
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_accounts" })
          .then((accounts: string[]) => {
            if (accounts.length > 0) {
              _initialize(parsedConnection.selectedAccount);
            }
          });
      }
    }
  });

  useEffect(() => {
    const handleAccountsChanged = async ([newAccount]: [
      newAccount: string
    ]) => {
      if (newAccount === undefined) {
        return _resetState();
      }
      await _initialize(ethers.getAddress(newAccount));
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", () => {
      _resetState();
      _setupNetwork();
    });
  });

  const _connectWallet = async () => {
    if (window.ethereum === undefined) {
      setNetworkError("Please install MetaMask!");
      return;
    }

    if (isRequestPending) {
      setNetworkError("Please wait for the previous request to complete.");
      return;
    }
    setIsRequestPending(true);

    try {
      const [selectedAccount] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      await _initialize(ethers.getAddress(selectedAccount));
      await _setupNetwork();
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequestPending(false);
    }
  };

  const _initialize = async (selectedAccount: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(selectedAccount);

    const connection = {
      ...currentConnection,
      provider,
      signer,
    };
    setCurrentConnection(connection);
    localStorage.setItem("currentConnection", JSON.stringify(connection));
  };

  const _setupNetwork = async () => {
    const chosenChainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    setCurrentWalletNetwork(chosenChainId);
  };

  const _resetState = () => {
    setNetworkError(undefined);
    setTransactionError(undefined);
    setTxBeingSent(false);
    setCurrentBalance(undefined);
    setIsOwner(false);
    setCurrentWalletNetwork(undefined);
    setCurrentConnection({
      provider: undefined,
      signer: undefined,
    });
  };

  const _dismissNetworkError = () => {
    setNetworkError(undefined);
  };

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
