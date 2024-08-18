import { useContext } from "react";
import { SampleWalletContext } from "./sample-wallet-context";
import { ethers } from "ethers";

export function Detail() {
  const { account, networkName, balance } = useContext(SampleWalletContext);
  if (!account) {
    return null;
  }
  const balanceEth = ethers.parseEther(balance);
  return (
    <div className="flex flex-col w-full gap-4 p-4 text-white rounded-md bg-slate-800">
      <div className="flex justify-between">
        <div className="text-2xl font-thin">balance</div>
        <div>network: {networkName}</div>
      </div>

      <div className="flex items-end gap-2">
        <div className="text-2xl">{balance.substring(0, 10)}</div>
        <div>ETH</div>
      </div>

      <div className="flex items-end gap-2">
        <div className="text-2xl">{ethers.formatUnits(balanceEth, "gwei")}</div>
        <div>GWEI</div>
      </div>

      <div className="flex items-end gap-2">
        <div className="text-2xl">{ethers.formatUnits(balanceEth, "wei")}</div>
        <div>WEI</div>
      </div>
    </div>
  );
}
