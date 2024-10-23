import hre from "hardhat";
import { TokenInfo } from "../app/types/tokenInfo";
import dotenv from "dotenv";
dotenv.config();

export default async function main() {
  const deployedContractAddress = process.env.address;
  const tokenInfoString = process.env.tokenInfo;
  const deployerTax = process.env.deployerTax;
  const deployFeeReceiver = process.env.deployFeeReceiver;

  let tokenInfo = {} as TokenInfo;
  if (tokenInfoString) {
    try {
      tokenInfo = JSON.parse(tokenInfoString) as TokenInfo;
    } catch (error) {
      throw new Error("Failed to parse TOKEN_INFO environment variable");
    }
  }

  if (
    !tokenInfo ||
    !deployerTax ||
    !deployFeeReceiver ||
    !deployedContractAddress
  ) {
    throw new Error("Missing required environment variables");
  }
  console.log("\nVERIFICATION....");
  try {
    await hre.run("verify:verify", {
      address: deployedContractAddress,
      constructorArguments: [
        tokenInfo.name,
        tokenInfo.symbol,
        process.env.NEXT_PUBLIC_DEV_ADDRESS,
        tokenInfo.totalSupply,
      ],
      contract: "contracts/StandardERC20.sol:StandardERC20",
    });
    //fix this on polygon, try with a testnet
    //":"ContractVerificationMissingBytecodeError: Failed to send contract verification request.\nEndpoint URL: https://api.polygonscan.com/api\nReason: The Etherscan API responded that the address 0x9c876B31F49b7E704C24dc76C96f2762f6888f6E does not have bytecode.\nThis can happen if the contract was recently deployed and this fact hasn't propagated to the backend yet.\nTry waiting for a minute before verifying your contract. If you are invoking this from a script,\ntry to wait for five confirmations of your contract deployment transaction before running the verification subtask.\n
    console.log(
      JSON.stringify({ status: "success", message: "Verification successful" })
    );
  } catch (error) {
    console.log(JSON.stringify({ status: "error", message: error }));
  }
}

main().catch((error) => {
  console.log(JSON.stringify({ status: "error", message: error }));
  process.exit(1);
});
