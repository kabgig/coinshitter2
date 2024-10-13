import hre, { ethers } from "hardhat";

export default async function main() {
  const deployedContractAddress = process.env.address;
  const contract = process.env.contract;
  const totalSupply = process.env.totalSupply;

  if (!deployedContractAddress || !contract || !totalSupply) {
    throw new Error("Missing required environment variables");
  }
  console.log("\n VERIFICATION...");

  try {
    const verificationId = await hre.run("verify:verify", {
      address: deployedContractAddress,
      contract: contract,
      constructorArguments: [totalSupply],
    });
    console.log("verificationId", verificationId);
    console.log(
      JSON.stringify({
        verificationId: verificationId,
      })
    );
    console.log(
      JSON.stringify({ status: "success", message: "Verification successful" })
    );
  } catch (error) {
    console.error("Verification failed:", error);
    console.log(JSON.stringify({ status: "error", message: error }));
  }
}

main()
  //.then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
