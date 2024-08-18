import { createContext } from "react";

type SampleWalletDefine = {
  walletProvider: any;
  setWalletProvider: (walletProvider: any) => void;
  msgIsOpen: boolean;
  setMsgIsOpen: (msgIsOpen: boolean) => void;
  msg: string;
  setMsg: (msg: string) => void;
  account: string;
  setAccount: (account: string) => void;
  networkName: string;
  setNetworkName: (networkName: string) => void;
  balance: string;
  setBalance: (balance: string) => void;
  showMessage: (message: string) => void;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
};

export const SampleWalletContext = createContext<SampleWalletDefine>(
  {} as SampleWalletDefine
);

export const SampleWalletProvider = SampleWalletContext.Provider;
