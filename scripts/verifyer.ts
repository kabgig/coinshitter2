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
  console.log("tokenInfo.totalSupply2", tokenInfo.totalSupply);
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
