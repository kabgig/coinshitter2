import { Flex, Heading, VStack } from "@chakra-ui/react";
import SubscribeForm from "./components/SubscribeForm";
import { Metadata } from "next";

export default function Home() {
  //add meta information

  return (
    <Flex
      height="10vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      paddingTop="15rem"
    >
      <VStack spacing={4} width="100%" maxWidth="400px">
        <Heading as="h1" size="xl">
          Service is under development. Subscribe to be the first to know about
          the launch.
        </Heading>
        <SubscribeForm />
      </VStack>
    </Flex>
  );
}

export const metadata: Metadata = {
  title: "Home - Coinshitter",
  description:
    "Coinshitter is a decentralized token launch platform. Launch your token on Binance Smart Chain or Ethereum with ease. No code knowledge required",
};
