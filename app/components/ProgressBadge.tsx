import { Badge, Box, Button, Spacer, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import useGlobalStore from "../state/store";

const ProgressBadge: React.FC = () => {
  const { interfaceLogMessage, setInterfaceLogMessage } = useGlobalStore();
  const [badgeText, setBadgeText] = useState(interfaceLogMessage);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setBadgeText(interfaceLogMessage);
    if (interfaceLogMessage) {
      setIsError(interfaceLogMessage.includes("Error"));
    }
  }, [interfaceLogMessage]);

  const handleDismiss = () => {
    setInterfaceLogMessage(undefined);
  };

  if (!badgeText) return null;
  return (
    <Badge variant="outline" p="2" fontSize="sm" maxWidth="100%">
      {isError && (
        <Button
          size="xs"
          width="100%"
          variant="outline"
          p={1}
          onClick={handleDismiss}
        >
          X
        </Button>
      )}
      <Text whiteSpace="normal" wordBreak="break-word" flex="1">
        {badgeText}
      </Text>
      <Spacer />
    </Badge>
  );
};

export default ProgressBadge;
