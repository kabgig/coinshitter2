"use client";
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Link,
  Select,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import useLocale from "../hooks/useLocales";
import useGlobalStore from "../state/store";
import FormTooltip from "./FormTooltip";
import { ethers } from "ethers";
import CoinshitterArtifact from "../../artifacts/contracts/Coinshitter.sol/Coinshitter.json";
import axios from "axios";
import metamask from "../../public/metamask.png";

type DeployedTokenInfo = {
  date: string;
  deployedContract: string;
  deployerAddress: string;
  network: string;
  contractUrl: string;
  tokenSymbol: string;
  tokenName: string;
  totalSupply: number;
  decimals: number;
};

const LaunchForm = () => {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  const { translate } = useLocale();
  const deployedToken = useRef<DeployedTokenInfo>();
  const interfaceLogMessage = useRef<string>();
  const { currentConnection } = useGlobalStore();
  const currentAddress = currentConnection?.signer?.getAddress() || "";

  const addTokenToMetaMask = async () => {
    if (!deployedToken.current) return;

    const { deployedContract, tokenSymbol, decimals } = deployedToken.current;

    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: deployedContract,
            symbol: tokenSymbol,
            decimals: decimals,
          },
        },
      });

      if (wasAdded) {
        console.log("Token added to MetaMask");
      } else {
        console.log("Token not added to MetaMask");
      }
    } catch (error) {
      console.error("Error adding token to MetaMask:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      decimals: 18,
      totalSupply: 1_000_000_000,
      tokenName: "",
      tokenSymbol: "",
      marketingAddress: "",
      chain: "",
      currentAddress: "",
    },
    validationSchema: Yup.object({
      decimals: Yup.number()
        .required("This field is required")
        .min(0, "Decimals must be zero or positive whole number"),
      totalSupply: Yup.number()
        .required("This field is required")
        .min(1, "Total supply must be more than 1")
        .integer("Total supply must be a whole number"),
      tokenName: Yup.string()
        .required("This field is required")
        .min(5, "Token name must be at least 5 characters long")
        .matches(/^[A-Za-z]+$/, "Token name must contain only letters"),
      tokenSymbol: Yup.string()
        .required("This field is required")
        .min(3, "Token symbol must be at least 3 characters long")
        .max(14, "Token symbol must be at most 14 characters long")
        .matches(/^[A-Z]+$/, "Token symbol must contain only capital letters"),
      marketingAddress: Yup.string()
        .required("This field is required")
        .test("is-eth-address", "Invalid address", (value) =>
          ethAddressRegex.test(value)
        ),
      chain: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      interfaceLogMessage.current = "Checking wallet connection...";

      deployedToken.current = undefined;
      if (!currentAddress) {
        alert("Please connect your wallet first!");
        return;
      }

      const networkMap: { [key: string]: bigint } = {
        BNB_TESTNET: 97n,
        BNB_MAINNET: 56n,
        HARDHAT: 1337n,
        BASE_MAINNET: 8453n,
        BASE_TESTNET_SEPOLIA: 84532n,
      };

      const selectedChainId = networkMap[values.chain];
      const totalSupply = values.totalSupply;
      const marketingAddress = values.marketingAddress;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const walletNetwork = await provider.getNetwork();

      interfaceLogMessage.current = "Checking network...";
      if (walletNetwork.chainId !== selectedChainId) {
        alert(
          `Change wallet network to match deployment network ${values.chain}.`
        );
        setSubmitting(false);
        return;
      }
      interfaceLogMessage.current = "Getting signer...";
      const signer = await provider.getSigner();
      const contractABI = CoinshitterArtifact.abi;
      const contractBytecode = CoinshitterArtifact.bytecode;

      interfaceLogMessage.current = "Getting contract factory...";
      const factory = new ethers.ContractFactory(
        contractABI,
        contractBytecode,
        signer
      );

      try {
        interfaceLogMessage.current = "Deploying contract...";
        const contract = await factory.deploy(totalSupply, marketingAddress);
        interfaceLogMessage.current = "Awaiting for deployment...";
        await contract.waitForDeployment();

        interfaceLogMessage.current =
          "Contract deployed! Verifying contract...";
        // const result = await axios.post("/api/verify", {
        //   deployedContractAddress: await contract.getAddress(),
        //   totalSupply: totalSupply,
        //   marketingAddress: marketingAddress,
        // });

        // console.log("Verification result:", result.data);

        //console.log("result", result);
        // const parsedResult = JSON.parse(result.data);
        // console.log("result", parsedResult);

        deployedToken.current = {
          // add compiler version, Compiler Type, and optimization
          // SPDX-License-Identifier: MIT
          // pragma solidity ^0.8.24;
          date: new Date().toISOString(),
          deployedContract: await contract.getAddress(),
          deployerAddress: signer.address,
          network: values.chain,
          contractUrl: result.data.verifiedUrl,
          tokenSymbol: values.tokenSymbol,
          tokenName: values.tokenName,
          totalSupply: totalSupply,
          decimals: 18,
        };
      } catch (error) {
        console.error("Error deploying contract:", error);
      } finally {
        console.log("setsubmitting false");
        setSubmitting(false);
      }
    },
  });

  if (!currentAddress) {
    return (
      <Flex
        height="10vh"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        paddingTop="10rem"
      >
        <Badge variant="outline" p="2">
          <Text fontSize="2xl">Connect your wallet to deploy a token.</Text>
        </Badge>
      </Flex>
    );
  }

  return (
    <Box p={4} maxWidth="500px" mx="auto">
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4}>
          <FormControl
            id="chain"
            isInvalid={formik.touched.chain && !!formik.errors.chain}
          >
            <FormLabel htmlFor="chain">Network</FormLabel>
            <InputGroup>
              {/* //TODO separation of the testnets from mainnets */}
              <Select placeholder="Choose" {...formik.getFieldProps("chain")}>
                <option value="BASE_MAINNET">Base Mainnet</option>
                <option value="BNB_MAINNET">BNB Mainnet BSC</option>
                <option value="BASE_TESTNET_SEPOLIA">
                  Base Testnet Sepolia
                </option>
                <option value="BNB_TESTNET">BNB Testnet</option>
                <option value="HARDHAT">Hardhat</option>
              </Select>
            </InputGroup>
            {formik.touched.chain && formik.errors.chain ? (
              <FormErrorMessage>{formik.errors.chain}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl
            id="tokenName"
            isInvalid={formik.touched.tokenName && !!formik.errors.tokenName}
          >
            <FormLabel htmlFor="tokenName">Token name</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter full token name"
                {...formik.getFieldProps("tokenName")}
              />
              <FormTooltip text={translate("fields.tokenName")} />
            </InputGroup>

            {formik.touched.tokenName && formik.errors.tokenName ? (
              <FormErrorMessage>{formik.errors.tokenName}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl
            id="tokenSymbol"
            isInvalid={
              formik.touched.tokenSymbol && !!formik.errors.tokenSymbol
            }
          >
            <FormLabel htmlFor="tokenSymbol">Token symbol</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter token symbol, e.g. BTC or ETH"
                {...formik.getFieldProps("tokenSymbol")}
              />
              <FormTooltip text={translate("fields.tokenSymbol")} />
            </InputGroup>

            {formik.touched.tokenSymbol && formik.errors.tokenSymbol ? (
              <FormErrorMessage>{formik.errors.tokenSymbol}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl
            id="totalSupply"
            isInvalid={
              formik.touched.totalSupply && !!formik.errors.totalSupply
            }
          >
            <FormLabel htmlFor="totalSupply">Total supply</FormLabel>
            <InputGroup>
              <Input
                placeholder="Total supply"
                {...formik.getFieldProps("totalSupply")}
              />
              <FormTooltip text={translate("fields.totalSupply")} />
            </InputGroup>

            {formik.touched.totalSupply && formik.errors.totalSupply ? (
              <FormErrorMessage>{formik.errors.totalSupply}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl
            id="decimals"
            isInvalid={formik.touched.decimals && !!formik.errors.decimals}
          >
            <FormLabel htmlFor="decimals">Decimals</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter decimals, e.g. 18"
                {...formik.getFieldProps("decimals")}
              />
              <FormTooltip text={translate("fields.decimals")} />
            </InputGroup>

            {formik.touched.decimals && formik.errors.decimals ? (
              <FormErrorMessage>{formik.errors.decimals}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl
            id="marketingAddress"
            isInvalid={
              formik.touched.marketingAddress &&
              !!formik.errors.marketingAddress
            }
          >
            <FormLabel htmlFor="marketingAddress">
              Marketing Wallet Address
            </FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter marketing wallet address"
                {...formik.getFieldProps("marketingAddress")}
              />
              <FormTooltip text={translate("fields.marketingAddress")} />
            </InputGroup>

            {formik.touched.marketingAddress &&
            formik.errors.marketingAddress ? (
              <FormErrorMessage>
                {formik.errors.marketingAddress}
              </FormErrorMessage>
            ) : null}
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={formik.isSubmitting}
          >
            Deploy token
          </Button>

          {/* {interfaceLogMessage.current && (
            <Badge variant="outline" p="2">
              <Text fontSize="xs" color="gray.500">
                {interfaceLogMessage.current}
              </Text>
            </Badge>
          )} */}

          {/* при сабмите надо добавить проверку имени и символа токена */}
          {deployedToken.current && (
            <Badge variant="outline" p="2">
              <Text fontSize="sm" color="gray.500">
                <Box textAlign="center">
                  <Button
                    onClick={addTokenToMetaMask}
                    colorScheme="teal"
                    mt={4}
                  >
                    Add token to MetaMask &nbsp;
                    <Image
                      src={metamask.src}
                      boxSize="30px"
                      objectFit="contain"
                      alt="logo"
                    />
                  </Button>
                </Box>
                <br />
                <b>Deployed token: </b>{" "}
                <u>
                  <Link
                    target="_blank"
                    href={deployedToken.current?.contractUrl}
                  >
                    {deployedToken.current?.deployedContract}
                  </Link>
                </u>
                <br />
                <b>Token owner: </b> {deployedToken.current?.deployerAddress}
                <br />
                <b>Token name: </b> {deployedToken.current?.tokenName}
                <br />
                <b>Token symbol: </b> {deployedToken.current?.tokenSymbol}
                <br />
                <b>Total supply: </b> {deployedToken.current?.totalSupply}
                <br />
                <b>Decimals: </b> {deployedToken.current?.decimals}
                <br />
                <b>Network: </b> {deployedToken.current?.network}
                <br />
                <b>Date: </b> {deployedToken.current?.date}
                <br />
              </Text>
            </Badge>
          )}
        </VStack>
      </form>
    </Box>
  );
};

export default LaunchForm;
