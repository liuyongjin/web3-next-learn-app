"use client";

import { Alert, Button, Heading, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import {
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { contract } from "@/constant";

export function TransferFrom() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const toast = useToast();

  const { data: config } = useSimulateContract({
    ...contract,
    functionName: "transferFrom",
    args: [from, to, amount],
    query: {
      enabled: from !== "" && to !== "" && amount !== 0,
    },
  });

  const {
    data: hash,
    isPending,
    error: writeError,
    isError: isWriteError,
    writeContract,
  } = useWriteContract();

  const {
    error: transactionError,
    isError: isTransactionError,
    isLoading: isTransactionLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  });

  if (hash) {
    toast({
      title: "转账成功",
      description: `转账成功，交易哈希：${hash}`,
      status: "success",
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Heading>通过授权账户进行转账</Heading>
      <Input
        value={from}
        onInput={(e) => setFrom((e.target as any).value)}
        placeholder="输入已被授权的地址"
      />
      <Input
        value={to}
        onInput={(e) => setTo((e.target as any).value)}
        placeholder="输入要转账的地址"
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
        转账
      </Button>

      {isWriteError || isTransactionError ? (
        <Alert status="error">{`授权失败，失败原因：${
          writeError || transactionError
        }`}</Alert>
      ) : null}
    </div>
  );
}
