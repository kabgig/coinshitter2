import hre from "hardhat";
import { ethers } from "ethers";
import { TokenInfo } from "../app/types/tokenInfo";

export default async function main() {
  const deployedContractAddress = process.env.address;
  // const contract = process.env.contract;
  // const totalSupply = process.env.totalSupply;
  // const marketingAddress = process.env.marketingAddress;
  //const tokenInfo = process.env.tokenInfo;
  const deployerTax = process.env.deployerTax;
  const deployFeeReceiver = process.env.deployFeeReceiver;

  if (
    //  !tokenInfo ||
    !deployerTax ||
    !deployFeeReceiver ||
    !deployedContractAddress
  ) {
    throw new Error("Missing required environment variables");
  }
  console.log("\nVERIFICATION....");
  const tokenInfo: TokenInfo = {
    name: "MyToken",
    symbol: "MTK",
    marketingFeeReceiver: "0xE09cd000335F9029af7A5AF1763963b3c0e78547",
    devFeeReceiver: "0xE09cd000335F9029af7A5AF1763963b3c0e78547",
    marketingTaxBuy: 1,
    marketingTaxSell: 2,
    devTaxSell: 3,
    devTaxBuy: 4,
    lpTaxBuy: 5,
    lpTaxSell: 6,
    totalSupply: ethers.parseUnits("1000000000", 18).toString(),
    maxPercentageForWallet: 5,
    maxPercentageForTx: 2,
    swapRouter: "0xE09cd000335F9029af7A5AF1763963b3c0e78547",
    newOwner: "0xE09cd000335F9029af7A5AF1763963b3c0e78547",
  };

  try {
    await hre.run("verify:verify", {
      address: deployedContractAddress,
      constructorArguments: [tokenInfo, deployerTax, deployFeeReceiver],
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
