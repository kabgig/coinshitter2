import { NextRequest, NextResponse } from "next/server";
import deploy from "../../utils/deploy";
import { ethers } from "hardhat";

export async function POST(request: NextRequest) {
  console.log("0");
  try {
    const [deployer, owner] = await ethers.getSigners();
    console.log("1");
    const CoinshitterFactory = await ethers.getContractFactory("Coinshitter");
    console.log("2");
    const coinshitterContract = await CoinshitterFactory.deploy();
    console.log("3");
    await coinshitterContract.waitForDeployment();
    // const body = await request.json();
    // const result = await deploy();
    // return NextResponse.json({ message: "Deployment successful" });
  } catch (error: any) {
    console.error("Deployment error:", error);
    return NextResponse.json(
      { message: "Deployment failed", error: error.message },
      { status: 500 }
    );
  }
}
