const hre = require("hardhat");

async function main() {
  const deployedContractAddress = process.env.address;
  const contract = process.env.contract;
  const totalSupply = process.env.totalSupply;
  const marketingAddress = process.env.marketingAddress;

  if (!deployedContractAddress || !contract || !totalSupply) {
    throw new Error("Missing required environment variables");
  }
  console.log("\nVERIFICATION....");

  try {
    await hre.run("verify:verify", {
      address: deployedContractAddress,
      constructorArguments: [totalSupply, marketingAddress],
    });
    console.log(
      JSON.stringify({ status: "success", message: "Verification successful" })
    );
  } catch (error) {
    console.log(JSON.stringify({ status: "error", message: error.message }));
  }
}

main().catch((error) => {
  console.log(JSON.stringify({ status: "error", message: error.message }));
  process.exit(1);
});
