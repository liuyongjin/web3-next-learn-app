import { ethers } from "ethers";
import { useCallback, useContext, useEffect } from "react";
import { SampleWalletContext } from "./sample-wallet-context";
import { Loading } from "@/components/loading";

export function Connect() {
  const {
    walletProvider,
    account,
    setAccount,
    setNetworkName,
    setBalance,
    showMessage,
    refresh,
  } = useContext(SampleWalletContext);

  const refreshBalance = useCallback(async () => {
    if (!walletProvider || !account) return;
    const balance = await walletProvider.getBalance(account);
    setBalance(ethers.formatEther(balance));
  }, [setBalance, walletProvider, account]);

  useEffect(() => {
    refreshBalance();
  }, [refresh, refreshBalance]);

  const connectToMetamask = async () => {
    try {
      const accounts = await walletProvider.send("eth_requestAccounts", []);
      const network = await walletProvider.getNetwork();
      const balance = await walletProvider.getBalance(accounts[0]);
      setAccount(accounts[0]);
      setNetworkName(network.name);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.log(error);
      showMessage("failed to connect to metamask");
    }
  };

  const disconnect = async () => {
    setAccount("");
  };

  if (!account) {
    return (
      <div className="flex justify-end">
        {walletProvider ? (
          <button
            className="px-4 py-2 text-white bg-black rounded-3xl"
            onClick={connectToMetamask}
          >
            connect to metamask
          </button>
        ) : (
          <Loading />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <h1 className="text-end">
        Hello,&nbsp;
        {account.substring(0, 5) +
          "..." +
          account.substring(account.length - 4, account.length)}
      </h1>
      <button
        className="px-4 py-2 text-white bg-black rounded-3xl"
        onClick={disconnect}
      >
        disconnect
      </button>
    </div>
  );
}
