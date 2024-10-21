import React from "react";
import { Text } from "@chakra-ui/react";
import useGlobalStore from "../state/store";
import { networkNames } from "../configs/networkIds";

const NetworkBadge = () => {
  const { currentWalletNetwork } = useGlobalStore();

  return (
    <Text fontSize="xs">
      {" "}
      {currentWalletNetwork && networkNames.get(currentWalletNetwork)}
    </Text>
  );
};

export default NetworkBadge;
