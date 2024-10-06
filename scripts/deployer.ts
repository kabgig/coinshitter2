import hre, { ethers } from "hardhat";

export default async function main() {
  const ownerWalletAddress = process.env.ownerWalletAddress;
  const totalSupply = process.env.totalSupply;
  const tokenName = process.env.tokenName;
  const tokenSymbol = process.env.tokenSymbol;
  const marketingAddress = process.env.marketingAddress;
  const chain = process.env.chain;

  console.log("\nownerWalletAddress:", ownerWalletAddress);
  console.log("totalSupply:", totalSupply);
  console.log("tokenName:", tokenName);
  console.log("tokenSymbol:", tokenSymbol);
  console.log("marketingAddress:", marketingAddress);
  console.log("chain:", chain + "\n");

  await hre.run("compile");

  console.log("\nDEPLOYING...");
  const [deployer] = await ethers.getSigners();

  const Coinshitter = await ethers.getContractFactory("Coinshitter");
  const coinshitter = await Coinshitter.deploy();
  await coinshitter.waitForDeployment();
  const address = await coinshitter.getAddress();

  console.log(
    JSON.stringify({
      deployedContract: address,
      deployerAddress: deployer.address,
      network: hre.network.name,
    })
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
