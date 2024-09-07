"use client";
import { Button, useColorModeValue } from "@chakra-ui/react";

const ConnectWalletButton = () => {
  const borderColor = useColorModeValue("black", "white");
  return (
    <Button variant="outline" borderWidth="2px" borderColor={borderColor}>
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;
