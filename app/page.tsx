import { Box } from "@chakra-ui/react";
import { Metadata } from "next";
import LaunchForm from "./components/LaunchForm";

export default function Home() {
  return (
    <Box>
      <LaunchForm />
    </Box>
  );
}

export const metadata: Metadata = {
  title: "Home - Coinshitter",
  description:
    "Coinshitter is a decentralized token launch platform. Launch your token on Binance Smart Chain or Ethereum with ease. No code knowledge required",
};
