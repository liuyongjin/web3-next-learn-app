"use client";

import { Alert, Button, Heading, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import {
  useWatchContractEvent,
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { contract } from "@/constant";

export function Transfer() {
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const toast = useToast();

  const { data: config } = useSimulateContract({
    ...contract,
    functionName: "transfer",
    args: [address, amount],
    query: {
      enabled: address !== "" && amount > 0,
    },
  });

  const { data: hash, isPending, writeContract } = useWriteContract();

  const {
    error: transactionError,
    isError: isTransactionError,
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  });

  if (isTransactionSuccess && hash) {
    toast({
      title: "转账成功",
      description: `转账成功，交易哈希：${hash}`,
      status: "success",
    });
  }

  useWatchContractEvent({
    ...contract,
    eventName: "Transfer",
    onLogs(logs) {
      console.log("New Transfer logs!", logs);
    },
    onError(error) {
      console.log("Transfer Error", error);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Heading>转账</Heading>
      <Input
        value={address}
        onInput={(e) => setAddress((e.target as any).value)}
        placeholder="输入要转账的钱包地址"
      />
      <Input
        value={amount}
        type="number"
        onInput={(e) => setAmount(Number((e.target as any).value))}
        placeholder="输入要转账的代币数量"
      />
      <Button
        disabled={!writeContract || isPending || isTransactionLoading}
        onClick={() => {
          writeContract?.(config!.request);
        }}
      >
        转账
      </Button>
      {isTransactionError ? (
        <Alert status="error">
          {`转账失败，失败原因：${transactionError}`}
        </Alert>
      ) : null}
    </div>
  );
}
