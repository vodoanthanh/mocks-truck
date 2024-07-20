"use client";

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React from "react";

export default function Home() {
  const [selected, setSelected] = React.useState("configurations");

  return (
    <div>
      <Tabs
        fullWidth
        variant="underlined"
        classNames={{
          cursor: "bg-primary w-[90%] z-10",
          tabContent: [
            "text-gray-500",
            "group-data-[selected=true]:text-primary",
            "group-data-[selected=true]:font-bold",
            "text-base",
          ],
          tabList: "pb-0 px-0",
          tab: "pb-[16px] pl-0 pr-[16px]",
          base: "w-full border-b-[0.5px] border-b-gray-200",
          panel: "pt-[40px] px-[56px]",
        }}
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
      >
        <Tab key="configurations" title="Configurations">
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="validations" title="Validations">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
