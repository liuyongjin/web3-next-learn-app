import React, { ReactNode } from "react";
import { config } from "@/config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

export function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider coolMode={false}>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}
