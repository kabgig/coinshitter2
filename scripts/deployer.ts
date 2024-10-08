import hre, { ethers } from "hardhat";

export default async function main() {
  const currentAddress = process.env.currentAddress;

  const HARDHAT_URL = "http://localhost:8545";
  const BNB_TESTNET_RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  const BNB_MAINNET_RPC_URL = "https://bsc-dataseed1.binance.org/";
  const BURRO_LOCO_PRIVATE_KEY =
    "99fdef4007a835d87cf0c09055d4f4c32ff799180dc53b26ec199ae5b7292b68";

  const provider = new ethers.JsonRpcProvider(BNB_TESTNET_RPC_URL);
  //const deployer = await provider.getSigner(currentAddress);
  const wallet = new ethers.Wallet(BURRO_LOCO_PRIVATE_KEY, provider);

  //console.log("Deploying with this address: ", await deployer.getAddress());
  await hre.run("compile");

  console.log("\nDEPLOYING...");
  //const [deployer] = await ethers.getSigners();

  const Coinshitter = await ethers.getContractFactory("Coinshitter", wallet);
  const coinshitter = await Coinshitter.deploy();
  await coinshitter.waitForDeployment();
  const address = await coinshitter.getAddress();

  console.log(
    JSON.stringify({
      deployedContract: address,
      deployerAddress: wallet.address,
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
