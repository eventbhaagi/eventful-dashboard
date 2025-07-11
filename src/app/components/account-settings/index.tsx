"use client";
import React from "react";
import CardBox from "@/app/components/shared/CardBox";
import AccountTab from "./AccountTab";

const AccountSettingIndex = () => {
  return (
    <>
      <CardBox className="px-6 py-6">
        <div className="p-6">
          <AccountTab />
        </div>
      </CardBox>
    </>
  );
};

export default AccountSettingIndex;
