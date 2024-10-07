import hre, { ethers } from "hardhat";

export default async function main() {
  const currentUserAddress = process.env.currentAddress;

  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const deployer = await provider.getSigner(currentUserAddress);

  console.log("Deploying with this address: ", await deployer.getAddress());
  await hre.run("compile");

  console.log("\nDEPLOYING...");
  //const [deployer] = await ethers.getSigners();

  const Coinshitter = await ethers.getContractFactory("Coinshitter", deployer);
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
