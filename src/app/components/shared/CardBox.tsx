"use client";

import { CustomizerContext } from "@/app/context/CustomizerContext";
import React, { useContext } from "react";

interface MyAppProps {
    children: React.ReactNode;
    className?: string;
}

const CardBox: React.FC<MyAppProps> = ({ children, className }) => {
    const context = useContext(CustomizerContext);
    const { isCardShadow = true, isBorderRadius = 8 } = context || {};

    return (
        <div
            className={`card ${className} ${isCardShadow ? ' shadow-md dark:shadow-none' : 'shadow-none border border-ld'} `}
            style={{
                borderRadius: `${isBorderRadius}px`,
            }}
        >
            {children}
        </div>
    );
};

export default CardBox; 