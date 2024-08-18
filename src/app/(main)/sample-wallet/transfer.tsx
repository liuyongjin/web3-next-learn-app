import { useContext, useState } from "react";
import { SampleWalletContext } from "./sample-wallet-context";
import { ethers } from "ethers";
import { Loading } from "@/components/loading";

export function Transfer() {
  const { walletProvider, account, showMessage, refresh, setRefresh } =
    useContext(SampleWalletContext);
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [transferring, setTransferring] = useState<boolean>(false);

  const transfer = async () => {
    try {
      const value = ethers.parseEther(amount);
      const signer = await walletProvider.getSigner();
      const tx = {
        to,
        value,
      };
      setTransferring(true);
      const receipt = await signer.sendTransaction(tx);
      await receipt.wait();
      setTo("");
      setAmount("");
      showMessage("successfully transferred");
    } catch (error) {
      console.log(error);
      showMessage("failed to transfer");
    } finally {
      setTransferring(false);
      setRefresh(!refresh);
    }
  };

  if (!account) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="text-4xl font-bold">Transfer</div>
      {transferring ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl">transferring...</div>
          <Loading size="xl" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            className="px-4 py-2 border-2 border-gray-300 rounded-3xl"
            value={to}
            onInput={(e: any) => setTo(e.target.value)}
            type="text"
            placeholder="address"
          />
          <input
            className="px-4 py-2 border-2 border-gray-300 rounded-3xl"
            value={amount}
            onInput={(e: any) => setAmount(e.target.value)}
            type="number"
            placeholder="amount(eth)"
          />
          <button
            className="px-4 py-2 text-white bg-black rounded-3xl"
            onClick={transfer}
          >
            send
          </button>
        </div>
      )}
    </div>
  );
}
