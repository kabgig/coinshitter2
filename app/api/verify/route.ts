import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  const deployedContractAddress = body.deployedContractAddress;
  const contract = "contracts/Coinshitter.sol:Coinshitter";
  const totalSupply = body.totalSupply;
  const marketingAddress = body.marketingAddress;

  return new Promise((resolve, reject) => {
    const verificationScriptPath = path.resolve(
      process.cwd(),
      "scripts/verifyer.ts"
    );
    exec(
      `HARDHAT_NETWORK=basesepolia npx ts-node ${verificationScriptPath}`,
      {
        env: {
          ...process.env,
          address: deployedContractAddress,
          //tokenName: body.tokenName,
          //tokenSymbol: body.tokenSymbol,
          totalSupply,
          //chain: body.chain,
          contract,
          marketingAddress,
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
        const urlMatch = stdout.match(/https:\/\/\S+/);
        const verifiedUrl = urlMatch ? urlMatch[0] : null;

        if (jsonMatch) {
          try {
            const jsonOutput = JSON.parse(jsonMatch[0]);
            if (verifiedUrl) jsonOutput.verifiedUrl = verifiedUrl;
            console.log("jsonOutput", jsonOutput);
            resolve(NextResponse.json(jsonOutput, { status: 201 }));
          } catch (parseError) {
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
