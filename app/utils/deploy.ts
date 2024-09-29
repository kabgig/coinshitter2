import hre, { ethers } from "hardhat";

const deploy = async () => {
  //pass contract arguments here
  console.log("DEPLOYING...");
  const [deployer, owner] = await ethers.getSigners();

  const CoinshitterFactory = await ethers.getContractFactory("Coinshitter");
  const coinshitterContract = await CoinshitterFactory.deploy();
  await coinshitterContract.waitForDeployment();
  //get info from deployed contract and return it
  return {
    address: coinshitterContract.getAddress(),
    owner: await coinshitterContract.owner(),
  };
};

export default deploy;
