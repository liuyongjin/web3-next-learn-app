"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Transfer } from "./transfer";
import { SampleWalletProvider } from "./sample-wallet-context";
import { Connect } from "./connect";
import { Description, Dialog, DialogPanel } from "@headlessui/react";
import { Detail } from "./detail";

export default function SampleWallet() {
  const [walletProvider, setWalletProvider] = useState<any>(null);
  const [msgIsOpen, setMsgIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [account, setAccount] = useState<string>("");
  const [networkName, setNetworkName] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!(window as any)?.ethereum) {
        return;
      }
      setWalletProvider(new ethers.BrowserProvider((window as any)?.ethereum));
    }
  }, [setWalletProvider]);

  const showMessage = (message: string) => {
    setMsg(message);
    setMsgIsOpen(true);
    setTimeout(() => {
      setMsg("");
      setMsgIsOpen(false);
    }, 2000);
  };

  if (typeof window !== "undefined") {
    if (!(window as any)?.ethereum) {
      return (
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-2xl font-thin">
            Please&nbsp;install&nbsp;
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
              MetaMask
            </a>
          </h1>
        </div>
      );
    }
  }

  return (
    <SampleWalletProvider
      value={{
        walletProvider,
        setWalletProvider,
        msgIsOpen,
        setMsgIsOpen,
        msg,
        setMsg,
        account,
        setAccount,
        networkName,
        setNetworkName,
        balance,
        setBalance,
        showMessage,
        refresh,
        setRefresh,
      }}
    >
      <div className="flex flex-col gap-4 p-4">
        <Dialog
          open={msgIsOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={() => setMsgIsOpen(false)}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-end p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-green-400 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <Description className="text-base/7 font-medium text-white">
                  {msg}
                </Description>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
        <Connect />
        <Detail />
        <Transfer />
      </div>
    </SampleWalletProvider>
  );
}
