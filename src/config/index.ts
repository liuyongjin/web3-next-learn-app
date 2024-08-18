import { cookieStorage, createStorage } from "wagmi";
import { projectId, appName } from "@/constant";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  goerli,
  zora,
  sepolia,
} from "wagmi/chains";

export const config = getDefaultConfig({
  appName,
  chains: [mainnet, polygon, optimism, arbitrum, base, goerli, zora, sepolia],
  ssr: true,
  projectId,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
