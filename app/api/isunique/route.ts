import axios from "axios";
import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";

dotenv.config();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const tokenName = body.tokenName;
    const tokenSymbol = body.tokenSymbol;

    const isUnique = true;

    try {
      const tokenInfo = await getTokenInfoBySymbol(tokenSymbol);
      console.log("Token Information:", tokenInfo);
    } catch (error) {
      console.error("Error:", error);
    }

    return NextResponse.json({ isUnique });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

async function getTokenInfoBySymbol(symbol: string) {
  const BASE_SCAN_API_KEY = process.env.BASE_SCAN_API_KEY;

  try {
    const response = await axios.get(
      `https://api-sepolia.basescan.org/api?module=token&action=tokeninfo&symbol=${symbol}&apikey=${BASE_SCAN_API_KEY}`
    );

    if (response.data.status === "1" && response.data.result.length > 0) {
      return response.data.result[0];
    } else {
      console.log("response.data", response.data);
      throw new Error("Token not found");
    }
  } catch (error) {
    console.error("Error fetching token information:", error);
    throw error;
  }
}
