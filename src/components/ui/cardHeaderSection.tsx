"use client";

import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface CardHeaderSectionProps {
  title: string;
  description: string;
}

export const CardHeaderSection = ({ title, description }: CardHeaderSectionProps) => {
  return (
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-black text-center">{title}</CardTitle>
      <CardDescription className="text-gray-600 text-center">{description}</CardDescription>
    </CardHeader>
  );
};
