"use client";
import {
  Box,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import Link from "next/link";
import { useEffect } from "react";
import logo from "../../public/logo.png";
import useGlobalStore from "../state/store";
import AddressBadge from "./AddressBadge";
import ColorModeSwitch from "./ColorModeSwitch";
import ConnectWallet from "./ConnectWalletButton";
import NetworkBadge from "./NetworkBadge";

const NavBar = () => {
  const { colorMode } = useColorMode();
  const {
    txBeingSent,
    currentBalance,
    setCurrentBalance,
    currentConnection,
    currentWalletNetwork,
    setCurrentWalletNetwork,
  } = useGlobalStore();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentConnection, txBeingSent]);

  useEffect(() => {
    const fetchNetwork = async () => {
      if (currentConnection?.provider) {
        const chainId = await currentConnection.provider.send(
          "eth_chainId",
          []
        );
        setCurrentWalletNetwork(chainId);
      }
    };

    fetchNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentConnection]);

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
          {/* <Link href="/">Home</Link> */}
          <Link href="/launch">Launch</Link>
          {/* <Link href="/faq">FAQ</Link> */}
        </HStack>
      </Box>
      <Spacer />
      <Box>
        <HStack gap={10} fontWeight="bold">
          {currentConnection && currentWalletNetwork && <NetworkBadge />}
          {currentBalance && (
            <Text fontSize="xs">
              {ethers.formatEther(currentBalance).slice(0, 7)}
            </Text>
          )}
          {currentConnection?.signer && (
            <AddressBadge address={currentConnection.signer.address} />
          )}
          {!currentConnection?.signer && <ConnectWallet />}
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
