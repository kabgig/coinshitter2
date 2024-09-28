import React from "react";
import NetworkErrorMessage from "./NetworkErrorMessage";
import { Button, useColorModeValue } from "@chakra-ui/react";

type ConnectWalletProps = {
  connectWallet: React.MouseEventHandler<HTMLButtonElement>;
  dismiss: React.MouseEventHandler<HTMLButtonElement>;
  networkError: string | undefined;
};

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  connectWallet,
  networkError,
  dismiss,
}) => {
  const borderColor = useColorModeValue("black", "white");
  return (
    <div>
      <Button
        onClick={connectWallet}
        variant="outline"
        borderWidth="2px"
        borderColor={borderColor}
      >
        Connect Wallet
      </Button>
      {networkError && (
        <NetworkErrorMessage message={networkError} dismiss={dismiss} />
      )}
    </div>
  );
};
export default ConnectWallet;
