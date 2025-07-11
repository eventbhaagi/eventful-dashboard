"use client";

import { CustomizerContext } from "@/app/context/CustomizerContext";

import { Card } from "flowbite-react";
import React, { useContext } from "react";


interface MyAppProps {
  children: React.ReactNode;
  className?: string;
}
const CardBox: React.FC<MyAppProps> = ({ children, className }) => {
  const context = useContext(CustomizerContext);

  // Provide fallback values if context is undefined (during SSR)
  const { activeMode = 'light', isCardShadow = false, isBorderRadius = 0 } = context || {};

  return (
    <Card className={`card ${className} ${isCardShadow ? ' shadow-md dark:shadow-none' : 'shadow-none border border-ld'} `}
      style={{
        borderRadius: `${isBorderRadius}px`,
      }}
    >{children}</Card>
  );

};
export default CardBox;
