"use client";

import { Alert, Heading, Spinner } from "@chakra-ui/react";
import { useReadContracts } from "wagmi";
import { contract } from "@/constant";

export function Detail() {
  const { data, error, isError, isLoading } = useReadContracts({
    contracts: [
      {
        ...contract,
        functionName: "name",
      },
      {
        ...contract,
        functionName: "symbol",
      },
      {
        ...contract,
        functionName: "decimals",
      },
      {
        ...contract,
        functionName: "totalSupply",
      },
    ],
  });

  const [name, symbol, decimals, totalSupply] = data || [];

  return (
    <div>
      <Heading>代币信息</Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div>代币名称：{name && name?.result?.toString()}</div>
          <div>代币代号：{symbol && symbol?.result?.toString()}</div>
          <div>代币精度：{decimals && decimals?.result?.toString()}</div>
          <div>代币总量：{totalSupply && totalSupply?.result?.toString()}</div>
        </>
      )}
      {isError ? (
        <Alert status="error">{`查询失败，失败原因：${error}`}</Alert>
      ) : null}
    </div>
  );
}
