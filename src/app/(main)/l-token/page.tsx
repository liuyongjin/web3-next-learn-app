"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Detail } from "./detail";
import { BalanceOf } from "./balance-of";
import { Transfer } from "./transfer";
import { Allowance } from "./allowance";
import { Approve } from "./approve";
import { TransferFrom } from "./transfer-from";

export default function LToken() {
  return (
    <div>
      <div className="flex justify-end p-4">
        <ConnectButton></ConnectButton>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList className="w-full overflow-auto">
            <Tab>Detail</Tab>
            <Tab>BalanceOf</Tab>
            <Tab>Transfer</Tab>
            <Tab>Allowance</Tab>
            <Tab>Approve</Tab>
            <Tab>TransferFrom</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Detail />
            </TabPanel>
            <TabPanel>
              <BalanceOf />
            </TabPanel>
            <TabPanel>
              <Transfer />
            </TabPanel>
            <TabPanel>
              <Allowance />
            </TabPanel>
            <TabPanel>
              <Approve />
            </TabPanel>
            <TabPanel>
              <TransferFrom />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
