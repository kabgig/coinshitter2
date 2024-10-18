import { Box } from "@chakra-ui/react";
import LaunchForm from "../components/LaunchForm";
import { Metadata } from "next";

const LaunchPage = () => {
  return (
    <Box>
      <LaunchForm />
      <LaunchForm />
    </Box>
  );
};

export default LaunchPage;

export const metadata: Metadata = {
  title: "Launch - Coinshitter",
  description:
    "Launch ERC20 tokens with ease. No code knowledge required. Coinshitter is a decentralized token launch platform. Launch your token on Binance Smart Chain or Base with ease.",
};
