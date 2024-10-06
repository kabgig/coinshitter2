import { exec } from "child_process";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(): Promise<void | Response> {
  return new Promise((resolve, reject) => {
    const deployScriptPath = path.resolve(process.cwd(), "scripts/deployer.ts");
    console.log(deployScriptPath);

    exec(
      `npx hardhat run ${deployScriptPath} --network hardhat`,
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
