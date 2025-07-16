"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface LabeledInputWithValidationProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn;
  validationResult?: boolean | null;
  onBlur?: (id: string, value: string) => void;
  error?: FieldError;
}

export const LabeledInputField = ({
  id,
  label,
  placeholder,
  register,
  type = "text",
  validationResult,
  onBlur,
  error,
}: LabeledInputWithValidationProps) => {
  return (
    <div key={id} className="space-y-2">
      <Label htmlFor={id} className="text-black font-medium">{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
          onBlur?.(id, e.target.value)
        }
      />
      {validationResult === false && (
        <p className="text-red-500 text-sm">Invalid URL format</p>
      )}
      {validationResult === true && (
        <p className="text-green-500 text-sm">✓ Valid URL</p>
      )}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
