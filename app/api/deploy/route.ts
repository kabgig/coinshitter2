import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest): Promise<void | Response> {
  const body = await request.json();

  return new Promise((resolve, reject) => {
    const deployScriptPath = path.resolve(process.cwd(), "scripts/deployer.ts");
    exec(
      `npx hardhat run ${deployScriptPath} --network hardhat`,
      {
        env: {
          ...process.env,
          ownerWalletAddress: body.ownerWalletAddress,
          totalSupply: body.totalSupply,
          tokenName: body.tokenName,
          tokenSymbol: body.tokenSymbol,
          marketingAddress: body.marketingAddress,
          chain: body.chain,
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
}
