"use client";
import React from "react";
import CardBox from "@/app/components/shared/CardBox";
import { Tabs, TabItem } from "flowbite-react";
import {
  IconArticle,
  IconBell,
  IconLock,
  IconUserCircle,
} from "@tabler/icons-react";
import GeneralTab from "@/app/components/account-settings/GeneralTab";
import ArtistTab from "@/app/components/account-settings/ArtistTab";
import NotificationTab from "@/app/components/account-settings/NotificationTab";
import BillsTab from "@/app/components/account-settings/BillsTab";
import SecurityTab from "@/app/components/account-settings/SecurityTab";

const AccountSettingIndex = () => {
  return (
    <>
      <CardBox className="px-0 py-0 ">
        <Tabs aria-label="Tabs with underline" variant="underline">
          <TabItem
            active
            title="General"
            icon={() => <IconUserCircle size={20} />}
          >
            <div className="p-6">
              <GeneralTab />
            </div>
          </TabItem>
          <TabItem
            title="Artist"
            icon={() => <IconUserCircle size={20} />}
          >
            <div className="p-6">
              <ArtistTab />
            </div>
          </TabItem>
          <TabItem title="Notification" icon={() => <IconBell size={20} />}>
            <div className="p-6">
              <NotificationTab />
            </div>
          </TabItem>
          <TabItem title="Bills" icon={() => <IconArticle size={20} />}>
            <div className="p-6">
              <BillsTab />
            </div>
          </TabItem>
          <TabItem title="Security" icon={() => <IconLock size={20} />}>
            <div className="p-6">
              <SecurityTab />
            </div>
          </TabItem>
        </Tabs>
      </CardBox>
    </>
  );
};

export default AccountSettingIndex;
