"use client";
import {
  Box,
  Flex,
  HStack,
  Image,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import logo from "../../public/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import ConnectWalletButton from "./ConnectWalletButton";

const NavBar = () => {
  const { colorMode } = useColorMode();
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
          <ConnectWalletButton />
          <ColorModeSwitch />
        </HStack>
      </Box>
    </Flex>
  );
};

export default NavBar;
