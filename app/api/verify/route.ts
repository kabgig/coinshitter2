import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import dotenv from "dotenv";
import hre from "hardhat";

// Load environment variables from .env file
dotenv.config();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const deployedContractAddress = body.deployedContractAddress;
  const contract = "contracts/Coinshitter.sol:Coinshitter";
  const totalSupply = body.totalSupply;

  return new Promise((resolve, reject) => {
    const verificationScriptPath = path.resolve(
      process.cwd(),
      "scripts/verifyer.ts"
    );
    exec(
      `npx hardhat run ${verificationScriptPath} --network basesepolia`,
      {
        env: {
          ...process.env,
          address: deployedContractAddress,
          //tokenName: body.tokenName,
          //tokenSymbol: body.tokenSymbol,
          totalSupply,
          //chain: body.chain,
          contract,
        },
      },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing script: ${stderr}`);
          reject(NextResponse.json({ error: stderr }, { status: 500 }));
          return;
        }

        console.log("\nScript output:\n\n" + stdout);

        const jsonMatch = stdout.match(/\{.*?\}/);
        console.log("jsonMatch", jsonMatch);

        if (jsonMatch) {
          try {
            const jsonOutput = JSON.parse(jsonMatch[0]);
            resolve(NextResponse.json(jsonOutput));
          } catch (parseError) {
            console.error(`Error parsing JSON output: ${parseError}`);
            reject(
              NextResponse.json(
                { error: "Failed to parse JSON output" },
                { status: 500 }
              )
            );
          }
        } else {
          reject(
            NextResponse.json(
              { error: "No JSON output found" },
              { status: 500 }
            )
          );
        }
      }
    );
  });
  //return NextResponse.json("Verification ID");
}
