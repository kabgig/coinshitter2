import hre, { ethers } from "hardhat";

async function main() {
  console.log("DEPLOYING...");
  const [deployer, owner] = await ethers.getSigners();

  const CoinshitterFactory = await ethers.getContractFactory("Coinshitter");
  const coinshitterContract = await CoinshitterFactory.deploy();
  await coinshitterContract.waitForDeployment();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
