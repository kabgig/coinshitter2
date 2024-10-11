import type { BrowserProvider } from "ethers";
import { ethers } from "ethers";

export type CurrentConnectionProps = {
  provider: BrowserProvider | undefined;
  signer: ethers.JsonRpcSigner | undefined;
};
