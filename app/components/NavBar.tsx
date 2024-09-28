"use client";
import {
  Box,
  Flex,
  Text,
  HStack,
  Image,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import logo from "../../public/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import ConnectWalletButton from "./ConnectWalletButton";

import { ethers } from "ethers";
import React, { useState, useEffect, FormEvent } from "react";
import type { BrowserProvider } from "ethers";

import ConnectWallet from "./ConnectWallet";
import WaitingForTransactionMessage from "./WaitingForTransactionMessage";
import TransactionErrorMessage from "./TransactionErrorMessage";

const HARDHAT_NETWORK_ID = "0x539";
const MUSIC_SHOP_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

declare let window: any;

type CurrentConnectionProps = {
  provider: BrowserProvider | undefined;
  signer: ethers.JsonRpcSigner | undefined;
};

const NavBar = () => {
  const { colorMode } = useColorMode();
  const [txBeingSent, setTxBeingSent] = useState<string>();
  const [currentBalance, setCurrentBalance] = useState<string>();
  const [transactionError, setTransactionError] = useState<string>();
  const [newtworkError, setNetworkError] = useState<string>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const borderColor = useColorModeValue("black", "white");
  const [currentConnection, setCurrentConnection] =
    useState<CurrentConnectionProps>();

  useEffect(() => {
    (async () => {
      if (currentConnection?.provider && currentConnection?.signer) {
        setCurrentBalance(
          (
            await currentConnection.provider.getBalance(
              currentConnection.signer.getAddress(),
              await currentConnection.provider.getBlockNumber()
            )
          ).toString()
        );
      }
    })();
  }, [currentConnection, txBeingSent]);

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

    window.ethereum.on("chainChanged", ([_networkId]: any) => {
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
    setTxBeingSent(undefined);
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

  const _dismissTransactionError = () => {
    setTransactionError(undefined);
  };

  const _getRpcErrorMessage = (error: any): string => {
    console.log(error);
    if (error.data) {
      return error.data.message;
    }
    return error.message;
  };
  const formatAddress = (address: string): string => {
    if (!address) return "";
    return `${address.slice(0, 7)}...${address.slice(-4)}`;
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1.5rem"
      gap={10}
      height="60px"
      width="100%"
    >
      <Box>
        <HStack gap={10} fontWeight="bold">
          <Link href="/">
            {colorMode === "light" ? (
              <Image
                src={logo.src}
                boxSize="200px"
                objectFit="contain"
                alt="logo"
              />
            ) : (
              <Image
                src={logo.src}
                boxSize="200px"
                objectFit="contain"
                filter="invert(1)"
                alt="logo"
              />
            )}
          </Link>
          <Link href="/">Home</Link>
          <Link href="/launch">Launch</Link>
          <Link href="/faq">FAQ</Link>
        </HStack>
      </Box>
      <Spacer />
      <Box>
        <HStack gap={10} fontWeight="bold">
          {currentBalance && (
            <Text fontSize="xs"> {ethers.formatEther(currentBalance)} ETH</Text>
          )}
          {currentConnection?.signer && (
            <Text
              fontSize="xs"
              variant="outline"
              borderWidth="2px"
              borderRadius="10"
              p="2"
              borderColor={borderColor}
            >
              {formatAddress(currentConnection.signer.address)}
            </Text>
          )}
          {!currentConnection?.signer && (
            <ConnectWallet
              connectWallet={_connectWallet}
              dismiss={_dismissNetworkError}
              networkError={newtworkError}
            />
          )}
          <ColorModeSwitch />
        </HStack>
      </Box>
    </Flex>
  );
};

export default NavBar;

// {txBeingSent && <WaitingForTransactionMessage txHash={txBeingSent} />}

// {transactionError && (
//   <TransactionErrorMessage
//     message={_getRpcErrorMessage(transactionError)}
//     dismiss={_dismissTransactionError}
//   />
// )}
