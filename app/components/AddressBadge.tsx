import { Text, useColorModeValue } from "@chakra-ui/react";

const AddressBadge = ({ address }: { address: string }) => {
  const borderColor = useColorModeValue("black", "white");

  return (
    <Text
      fontSize="xs"
      variant="outline"
      borderWidth="2px"
      borderRadius="10"
      p="2"
      borderColor={borderColor}
    >
      {formatAddress(address)}
    </Text>
  );
};

const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 7)}...${address.slice(-4)}`;
};

export default AddressBadge;
