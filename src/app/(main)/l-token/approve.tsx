"use client";

import { Alert, Button, Heading, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import {
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { contract } from "@/constant";

export function Approve() {
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { data: config } = useSimulateContract({
    ...contract,
    functionName: "approve",
    args: [address, amount],
    query: {
      enabled: address !== "" && amount !== 0,
    },
  });

  const { data: hash, isPending, writeContract } = useWriteContract();

  const {
    error: transactionError,
    isError: isTransactionError,
    isLoading: isTransactionLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const toast = useToast();

  if (hash) {
    toast({
      title: "授权成功",
      description: `授权成功，交易哈希：${hash}`,
      status: "success",
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Heading>授权</Heading>
      <Input
        value={address}
        onInput={(e) => setAddress((e.target as any).value)}
        placeholder="输入要授权的钱包地址"
      />
      <Input
        value={amount}
        type="number"
        onInput={(e) => setAmount(Number((e.target as any).value))}
        placeholder="输入要授权的代币数量"
      />
      <Button
        disabled={!writeContract || isPending || isTransactionLoading}
        onClick={() => {
          writeContract?.(config!.request);
        }}
      >
        授权
      </Button>

      {isTransactionError ? (
        <Alert status="error">{`授权失败，失败原因：${transactionError}`}</Alert>
      ) : null}
    </div>
  );
}
