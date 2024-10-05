import { NextRequest, NextResponse } from "next/server";
import { ethers } from "hardhat";

export async function POST(request: NextRequest) {
  const Coinshitter = await ethers.getContractFactory("Coinshitter");
  const coinshitter = await Coinshitter.deploy();
  await coinshitter.waitForDeployment();
  return NextResponse.json({ message: "Hello, world!" });
}
