import hre, { ethers } from "hardhat";

export default async function main() {
  await hre.run("compile");

  console.log("DEPLOYING...");
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Coinshitter = await ethers.getContractFactory("Coinshitter");
  const coinshitter = await Coinshitter.deploy();
  await coinshitter.waitForDeployment();
  const address = await coinshitter.getAddress();

  console.log("Deployed contract address:", address);
  console.log(
    JSON.stringify({
      contractAddress: address,
      deployer: deployer.address,
      network: hre.network.name,
    })
  );
  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
