import { create } from "zustand";
import type { CurrentConnectionProps } from "../types/connection";

interface globalStore {
  currentBalance: string | undefined;
  setCurrentBalance: (balance: string | undefined) => void;
  currentConnection: CurrentConnectionProps | undefined;
  setCurrentConnection: (connection: CurrentConnectionProps) => void;
  txBeingSent: boolean;
  setTxBeingSent: (txBeingSent: boolean) => void;
  networkError: string | undefined;
  setNetworkError: (networkError: string | undefined) => void;
  transactionError: string | undefined;
  setTransactionError: (transactionError: string | undefined) => void;
  isOwner: boolean;
  setIsOwner: (isOwner: boolean) => void;
}

const useGlobalStore = create<globalStore>((set) => ({
  currentBalance: undefined,
  setCurrentBalance: (balance) => set({ currentBalance: balance }),
  currentConnection: { provider: undefined, signer: undefined },
  setCurrentConnection: (connection) => set({ currentConnection: connection }),
  txBeingSent: false,
  setTxBeingSent: (txBeingSent) => set({ txBeingSent: txBeingSent }),
  networkError: undefined,
  setNetworkError: (networkError) => set({ networkError: networkError }),
  transactionError: undefined,
  setTransactionError: (transactionError) =>
    set({ transactionError: transactionError }),
  isOwner: false,
  setIsOwner: (isOwner) => set({ isOwner: isOwner }),
}));

export default useGlobalStore;
