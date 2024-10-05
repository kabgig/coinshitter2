import { ethers } from "hardhat";

export default async function deployContract() {
  console.log("DEPLOYING...");
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Coinshitter = await ethers.getContractFactory("Coinshitter");
  const coinshitter = await Coinshitter.deploy();
  await coinshitter.waitForDeployment();
}
