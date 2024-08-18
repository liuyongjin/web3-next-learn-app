"use client";

import { Alert, Heading, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useReadContract } from "wagmi";
import { contract } from "@/constant";

export function BalanceOf() {
  const [address, setAddress] = useState<string>("");

  const {
    data: balance,
    error,
    isError,
    isLoading,
  } = useReadContract({
    ...contract,
    functionName: "balanceOf",
    args: [address],
    query: {
      enabled: address !== "",
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Heading>查询代币余额</Heading>
      <Input
        placeholder="输入钱包地址自动查询代币余额"
        value={address}
        onInput={(e) => setAddress((e.target as any).value)}
      />
      {isLoading ? <Spinner /> : <div>{balance?.toString()}</div>}
      <div>
        {address !== "" && isError && (
          <Alert status="error">{`查询失败，失败原因：${error}`}</Alert>
        )}
      </div>
    </div>
  );
}
