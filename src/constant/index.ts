import LTokenJson from "@/contract/l-coin/LToken.json";

export const contract = {
  abi: LTokenJson.abi,
  address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as `0x${string}`,
};

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

export const appName = "LToken";

export const gitHub = "https://github.com/liuyongjin";

export const examples = [
  {
    name: "简单钱包",
    icon: "TbWallet",
    description:
      "使用 ethers.js 连接 Metamask，实现了连接、断开、查询余额、刷新余额、转账等加密钱包的极简功能。麻雀虽小，五脏俱全。",
    url: "/sample-wallet",
    technologyStack: [
      "next.js",
      "react",
      "tailwindcss",
      "headless-ui",
      "ethers.js",
    ],
  },
  {
    name: "钱包地址生成器",
    description: "使用 ethers.js 批量生成随机的钱包地址，支持 Excel 导出。",
    url: "/wallet-generator",
    icon: "GiPerspectiveDiceSixFacesRandom",
    technologyStack: [
      "next.js",
      "react",
      "tailwindcss",
      "chakra-ui",
      "ethers.js",
      "xlsx",
    ],
  },
  {
    name: "钱包靓号生成器",
    description: "使用 ethers.js 实现的钱包靓号生成器。",
    url: "/wallet-genuine-number-generator",
    icon: "BiCool",
    technologyStack: [
      "next.js",
      "react",
      "tailwindcss",
      "chakra-ui",
      "ethers.js",
    ],
  },
  {
    name: "LCoin 代币",
    description:
      "基于 ERC20 协议实现的 Noah 代币。实现了 ERC20 的所有功能。包含了代币的发行、转账、查询余额、查询总量、授权、授权转账等功能。",
    url: "/l-token",
    icon: "GiToken",
    technologyStack: [
      "next.js",
      "react",
      "tailwindcss",
      "chakra-ui",
      "wagmi",
      "solidity",
    ],
  },
];
