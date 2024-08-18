"use client";

import { Alert, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useWatchContractEvent, useReadContract } from "wagmi";
import { contract } from "@/constant";

export function Allowance() {
  const [owner, setOwner] = useState<string>("");
  const [spender, setSpender] = useState<string>("");

  const { data, error, refetch, isError } = useReadContract({
    ...contract,
    functionName: "allowance",
    args: [owner, spender],
    query: {
      enabled: owner !== "" && spender !== "",
    },
  });

  useWatchContractEvent({
    ...contract,
    eventName: "Approval",
    onLogs(logs) {
      console.log("New Approval logs!", logs);
    },
    onError(error) {
      console.log("Approval Error", error);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Heading>查询代币授权余额</Heading>
      <Input
        placeholder="输入授权人地址"
        value={owner}
        onInput={(e) => setOwner((e.target as any).value)}
      />
      <Input
        placeholder="输入被授权人地址"
        value={spender}
        onInput={(e) => setSpender((e.target as any).value)}
      />
      <div>输入地址自动显示授权余额</div>
      <div>余额: {data?.toString()}</div>
      {owner !== "" && spender !== "" && isError ? (
        <Alert status="error">{`查询失败，失败原因：${error}`}</Alert>
      ) : null}
    </div>
  );
}
