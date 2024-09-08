import React, { useState } from "react";
import { connectMetaMask } from "../utils/connectMetamask";

const useMetamask = () => {
  const [account, setAccount] = useState(null);

  const handleConnect = async () => {
    const { accounts, provider, signer } = await connectMetaMask();
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
      // You can now use `provider` and `signer` for interactions
    }
  };

  return (
    <div>
      {account ? (
        <p>Connected as: {account}</p>
      ) : (
        <button onClick={handleConnect}>Connect MetaMask</button>
      )}
    </div>
  );
};

export default useMetamask;
