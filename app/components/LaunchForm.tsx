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
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as Yup from "yup";
import useLocale from "../hooks/useLocales";
import useGlobalStore from "../state/store";
import FormTooltip from "./FormTooltip";
import { ethers } from "ethers";
import CoinshitterArtifact from "../../artifacts/contracts/Coinshitter.sol/Coinshitter.json";

type DeployedTokenInfo = {
  date: string;
  deployedContract: string;
  deployerAddress: string;
  network: string;
};

const LaunchForm = () => {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  const { translate } = useLocale();
  const deployedToken = useRef<DeployedTokenInfo>();
  const { currentConnection } = useGlobalStore();
  const currentAddress = currentConnection?.signer?.getAddress() || "";

  const formik = useFormik({
    initialValues: {
      ownerWalletAddress: "",
      totalSupply: 1_000_000_000,
      tokenName: "",
      tokenSymbol: "",
      marketingAddress: "",
      chain: "",
      currentAddress: "",
    },
    validationSchema: Yup.object({
      ownerWalletAddress: Yup.string()
        .required("This field is required")
        .test("is-eth-address", "Invalid address", (value) =>
          ethAddressRegex.test(value)
        ),
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

      const provider = new ethers.BrowserProvider(window.ethereum);
      const walletNetwork = await provider.getNetwork();
      console.log("walletNetwork", walletNetwork);
      console.log("selectedChainId", selectedChainId);

      if (walletNetwork.chainId !== selectedChainId) {
        alert(
          `Change your wallet network to match deployment network ${values.chain}.`
        );
        setSubmitting(false);
        return;
      }
      const signer = await provider.getSigner();

      const contractABI = CoinshitterArtifact.abi;
      const contractBytecode = CoinshitterArtifact.bytecode;

      const factory = new ethers.ContractFactory(
        contractABI,
        contractBytecode,
        signer
      );

      try {
        const contract = await factory.deploy(/* constructor arguments */);
        await contract.waitForDeployment();

        deployedToken.current = {
          date: new Date().toISOString(),
          deployedContract: await contract.getAddress(),
          deployerAddress: signer.address,
          network: values.chain,
        };
      } catch (error) {
        console.error("Error deploying contract:", error);
      }

      setSubmitting(false);
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
            id="ownerWalletAddress"
            isInvalid={
              formik.touched.ownerWalletAddress &&
              !!formik.errors.ownerWalletAddress
            }
          >
            <FormLabel htmlFor="ownerWalletAddress">
              Owner Wallet Address
            </FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter owner wallet address"
                {...formik.getFieldProps("ownerWalletAddress")}
              />
              <FormTooltip text={translate("fields.ownerWalletAddress")} />
            </InputGroup>

            {formik.touched.ownerWalletAddress &&
            formik.errors.ownerWalletAddress ? (
              <FormErrorMessage>
                {formik.errors.ownerWalletAddress}
              </FormErrorMessage>
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
            id="chain"
            isInvalid={formik.touched.chain && !!formik.errors.chain}
          >
            <FormLabel htmlFor="chain">Deployment chain</FormLabel>
            <InputGroup>
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
          {deployedToken.current && (
            <Badge variant="outline" p="2">
              <Text fontSize="sm" color="gray.500">
                <b>Deployed contract:</b>{" "}
                {deployedToken.current?.deployedContract}
                <br />
                <b>Deployer address:</b>{" "}
                {deployedToken.current?.deployerAddress}
                <br />
                <b>Network:</b> {deployedToken.current?.network}
                <br />
                <b>Date:</b> {deployedToken.current?.date}
              </Text>
            </Badge>
          )}
        </VStack>
      </form>
    </Box>
  );
};

export default LaunchForm;
