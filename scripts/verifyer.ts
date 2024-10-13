import hre from "hardhat";

export default async function main() {
  const deployedContractAddress = process.env.address;
  const contract = process.env.contract;
  const totalSupply = process.env.totalSupply;
  const marketingAddress = process.env.marketingAddress;

  console.log("totalSupply", totalSupply);
  console.log("marketingAddress", marketingAddress);
  console.log("deployedContractAddress", deployedContractAddress);
  console.log("contract", contract);
  if (!deployedContractAddress || !contract || !totalSupply) {
    throw new Error("Missing required environment variables");
  }
  console.log("\nVERIFICATION...");

  try {
    await hre.run("verify:verify", {
      address: deployedContractAddress,
      constructorArguments: [totalSupply, marketingAddress],
    });
    //на крайняк можно текстовый файл билдить с уникальным название контракта
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
