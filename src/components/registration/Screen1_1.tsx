"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Card} from "../ui/card";
import { CardHeaderSection } from "../ui/cardHeaderSection";

// Validation schema for Screen 1.1
const screen1_1Schema = z
  .object({
    whatsappCountryCode: z.string().min(1, "Country code is required"),
    whatsappNumber: z
      .string()
      .min(10, "WhatsApp number must be at least 10 digits"),
    whatsappOTP: z.string().min(4, "OTP must be 4 digits"),
    companyEmail: z.string().email("Invalid email format").optional(),
    companyEmailOTP: z.string().min(4, "OTP must be 4 digits").optional(),
    personalEmail: z.string().email("Invalid email format"),
    personalEmailOTP: z.string().min(4, "OTP must be 4 digits"),
    whatsappConsent: z.boolean(),
    showCompanyEmail: z.boolean(),
  })
  .refine(
    (data) => {
      // If company email is provided, OTP is required
      if (data.companyEmail && data.companyEmail.trim() !== "") {
        return data.companyEmailOTP && data.companyEmailOTP.trim() !== "";
      }
      return true;
    },
    {
      message: "Company email OTP is required when company email is provided",
      path: ["companyEmailOTP"],
    }
  )
  .refine(
    (data) => {
      // Personal email OTP is always required
      return data.personalEmailOTP && data.personalEmailOTP.trim() !== "";
    },
    {
      message: "Personal email OTP is required",
      path: ["personalEmailOTP"],
    }
  );

type Screen1_1FormData = z.infer<typeof screen1_1Schema>;

interface Screen1_1Props {
  onNext: (data: Screen1_1FormData) => void;
  onSkip: () => void;
}

export default function Screen1_1({ onNext, onSkip }: Screen1_1Props) {
  const [whatsappOTPVerified, setWhatsappOTPVerified] = useState(false); // 🆕 Track if OTP is verified
  const [whatsappTimer, setWhatsappTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [whatsappOTPSent, setWhatsappOTPSent] = useState(false);
  const [companyEmailOTPVerified, setCompanyEmailOTPVerified] = useState(false);
  const [companyEmailTimer, setCompanyEmailTimer] = useState(0);
  const [companyEmailOTPSent, setCompanyEmailOTPSent] = useState(false);

  const [personalEmailOTPSent, setPersonalEmailOTPSent] = useState(false);
  const [personalEmailOTPVerified, setPersonalEmailOTPVerified] =
    useState(false);
  const [personalEmailTimer, setPersonalEmailTimer] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Screen1_1FormData>({
    resolver: zodResolver(screen1_1Schema),
    defaultValues: {
      whatsappCountryCode: "+91",
      whatsappNumber: "",
      whatsappOTP: "",
      companyEmail: "",
      companyEmailOTP: "",
      personalEmail: "",
      personalEmailOTP: "",
      whatsappConsent: false,
      showCompanyEmail: true, // Default to true as per requirement
    },
  });

  const watchedValues = watch();
  const showCompanyEmail = watchedValues.showCompanyEmail;

  // Send OTP functions
  const sendWhatsAppOTP = async () => {
    const whatsappNumber = watch("whatsappNumber");
    if (!whatsappNumber || whatsappNumber.length < 10) {
      alert("Please enter a valid WhatsApp number");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setWhatsappOTPSent(true); // Mark OTP sent
      setWhatsappOTPVerified(false); // Reset OTP verification
      setWhatsappTimer(60); // Start 60-second timer
      alert("OTP sent to your WhatsApp number");
    } catch (error) {
      console.error("Error sending WhatsApp OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyWhatsAppOTP = () => {
    const otp = watch("whatsappOTP");
    if (otp && otp.length === 4) {
      setWhatsappOTPVerified(true); // Mark OTP verified
      setWhatsappTimer(0); // Stop timer if verified
    }
  };

  useEffect(() => {
    verifyWhatsAppOTP();
  }, [watch("whatsappOTP")]);

  useEffect(() => {
    if (whatsappTimer <= 0 || whatsappOTPVerified) return; // 🆕 Stop timer if reached 0 or OTP is verified
    const interval = setInterval(() => {
      setWhatsappTimer((prev) => prev - 1); // ⏳ Decrement timer every second
    }, 1000);
    return () => clearInterval(interval); // 🧹 Clean up interval
  }, [whatsappTimer, whatsappOTPVerified]);

  useEffect(() => {
    if (companyEmailTimer > 0 && !companyEmailOTPVerified) {
      const interval = setInterval(
        () => setCompanyEmailTimer((prev) => prev - 1),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [companyEmailTimer, companyEmailOTPVerified]);

  useEffect(() => {
    if (personalEmailTimer > 0 && !personalEmailOTPVerified) {
      const interval = setInterval(
        () => setPersonalEmailTimer((prev) => prev - 1),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [personalEmailTimer, personalEmailOTPVerified]);

  const sendCompanyEmailOTP = async () => {
    const companyEmail = watch("companyEmail");
    if (!companyEmail || !companyEmail.includes("@")) {
      alert("Please enter a valid company email");
      return;
    }

    // Check if it's a generic domain (not custom domain)
    const domain = companyEmail.split("@")[1];
    const genericDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
    ];
    if (!genericDomains.includes(domain.toLowerCase())) {
      alert(
        "Company email must use a generic domain (Gmail, Yahoo, Hotmail, etc.)"
      );
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCompanyEmailOTPSent(true);
      setCompanyEmailOTPVerified(false);
      setCompanyEmailTimer(60);
      alert("OTP sent to your company email");
    } catch (error) {
      console.error("Error sending company email OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendPersonalEmailOTP = async () => {
    const personalEmail = watch("personalEmail");
    if (!personalEmail || !personalEmail.includes("@")) {
      alert("Please enter a valid personal email");
      return;
    }

    // Check if it's a custom domain (not generic domain)
    const domain = personalEmail.split("@")[1];
    const genericDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
    ];
    if (genericDomains.includes(domain.toLowerCase())) {
      alert(
        "Personal email must use a custom domain (not Gmail, Yahoo, Hotmail, etc.)"
      );
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPersonalEmailOTPSent(true);
      setPersonalEmailOTPVerified(false);
      setPersonalEmailTimer(60);
      alert("OTP sent to your personal email");
    } catch (error) {
      console.error("Error sending personal email OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const verifyCompanyEmailOTP = () => {
    const otp = watch("companyEmailOTP");
    if (otp && otp.length === 4) {
      setCompanyEmailOTPVerified(true);
      setCompanyEmailTimer(0);
    }
  };

  useEffect(() => {
    verifyCompanyEmailOTP();
  }, [watch("companyEmailOTP")]);

  const verifyPersonalEmailOTP = () => {
    const otp = watch("personalEmailOTP");
    if (otp && otp.length === 4) {
      setPersonalEmailOTPVerified(true);
      setPersonalEmailTimer(0);
    }
  };

  useEffect(() => {
    verifyPersonalEmailOTP();
  }, [watch("personalEmailOTP")]);

  const onSubmit = async (data: Screen1_1FormData) => {
    setIsLoading(true);
    try {
      onNext(data);
    } catch (error) {
      console.error("Validation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 shadow-2xl bg-white space-y-8">
        <CardHeaderSection
  title="User Registration"
  description="Contact Information"
/>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* WhatsApp Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-black">WhatsApp Number</h2>
            <span className="text-red-500">*</span>
          </div>
          <p className="text-sm text-gray-600">
            We&apos;ll send you an OTP to verify your WhatsApp number
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsappCountryCode" className="text-black font-medium">Country Code</Label>
              <Select
                value={watch("whatsappCountryCode")}
                onValueChange={(value) =>
                  setValue("whatsappCountryCode", value)
                }
              >
                <SelectTrigger id="whatsappCountryCode">
                  <SelectValue placeholder="Select country code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">🇮🇳 +91 (India)</SelectItem>
                  <SelectItem value="+1">🇺🇸 +1 (USA)</SelectItem>
                  <SelectItem value="+44">🇬🇧 +44 (UK)</SelectItem>
                  <SelectItem value="+61">🇦🇺 +61 (Australia)</SelectItem>
                  <SelectItem value="+81">🇯🇵 +81 (Japan)</SelectItem>
                  {/* Add more country codes as needed */}
                </SelectContent>
              </Select>
              {errors.whatsappCountryCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.whatsappCountryCode.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <Label htmlFor="whatsappNumber" className="text-black font-medium">WhatsApp Number</Label>
              <Input
                id="whatsappNumber"
                type="tel"
                className="placeholder:text-gray-400 text-white"
                placeholder="Enter your WhatsApp number"
                {...register("whatsappNumber")}
              />
              {errors.whatsappNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.whatsappNumber.message}
                </p>
              )}
            </div>
          </div>

          {!whatsappOTPSent && (
            <Button
              type="button"
              variant="outline"
              onClick={sendWhatsAppOTP}
              disabled={isLoading || !watch("whatsappNumber")}
              className="w-full"
            >
              {isLoading ? "Sending..." : "Send WhatsApp OTP"}
            </Button>
          )}

          {whatsappOTPSent && !whatsappOTPVerified && whatsappTimer > 0 && (
            <p className="text-sm text-gray-600">
              Resend OTP in{" "}
              <span className="font-semibold">{whatsappTimer}</span> seconds
            </p>
          )}

          {whatsappOTPSent && !whatsappOTPVerified && whatsappTimer === 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={sendWhatsAppOTP}
              className="w-full"
            >
              Resend OTP
            </Button>
          )}

          {whatsappOTPSent && (
            <div>
              <Label htmlFor="whatsappOTP" className="text-black font-medium">Enter OTP</Label>
              <Input
                id="whatsappOTP"
                placeholder="Enter 4-digit OTP"
                maxLength={4}
                {...register("whatsappOTP")}
              />
              {errors.whatsappOTP && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.whatsappOTP.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Company Email Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showCompanyEmail"
              checked={showCompanyEmail}
              onCheckedChange={(checked) =>
                setValue("showCompanyEmail", checked as boolean)
              }
            />
            <Label htmlFor="showCompanyEmail" className="text-lg font-medium text-black">
              I have a Company Email
            </Label>
          </div>

          {showCompanyEmail && (
            <>
              <div>
                <Label htmlFor="companyEmail" className="text-black font-medium">Company Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  placeholder="Enter your company email (generic domain only)"
                  {...register("companyEmail")}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Must use generic domain (Gmail, Yahoo, Hotmail, etc.)
                </p>
                {errors.companyEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyEmail.message}
                  </p>
                )}
              </div>
              {!companyEmailOTPSent && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={sendCompanyEmailOTP}
                  disabled={isLoading || !watch("companyEmail")}
                  className="w-full"
                >
                  {isLoading ? "Sending..." : "Send Company Email OTP"}
                </Button>
              )}

              {companyEmailOTPSent &&
                !companyEmailOTPVerified &&
                companyEmailTimer > 0 && (
                  <p className="text-sm text-gray-600">
                    Resend OTP in{" "}
                    <span className="font-semibold">{companyEmailTimer}</span>{" "}
                    seconds
                  </p>
                )}

              {companyEmailOTPSent &&
                !companyEmailOTPVerified &&
                companyEmailTimer === 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={sendWhatsAppOTP}
                    className="w-full"
                  >
                    Resend OTP
                  </Button>
                )}

              {companyEmailOTPSent && (
                <div>
                  <Label htmlFor="companyEmailOTP" className="text-black font-medium">
                    Enter Company Email OTP
                  </Label>
                  <Input
                    id="companyEmailOTP"
                    placeholder="Enter 4-digit OTP"
                    className="text-white"
                    maxLength={4}
                    {...register("companyEmailOTP")}
                  />
                  {errors.companyEmailOTP && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyEmailOTP.message}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Personal Email Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-black">Personal Email</h2>
            <span className="text-red-500">*</span>
          </div>
          <p className="text-sm text-gray-600">
            Must use custom domain (not Gmail, Yahoo, Hotmail, etc.)
          </p>

          <div>
            <Label htmlFor="personalEmail" className="text-black font-medium">Personal Email</Label>
            <Input
              id="personalEmail"
              type="email"
              placeholder="Enter your personal email (custom domain only)"
              {...register("personalEmail")}
            />
            {errors.personalEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.personalEmail.message}
              </p>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={sendPersonalEmailOTP}
            disabled={isLoading || !watch("personalEmail")}
            className="w-full"
          >
            {isLoading ? "Sending..." : "Send Personal Email OTP"}
          </Button>

          {personalEmailOTPSent && (
            <div>
              <Label htmlFor="personalEmailOTP">Enter Personal Email OTP</Label>
              <Input
                id="personalEmailOTP"
                placeholder="Enter 4-digit OTP"
                maxLength={4}
                {...register("personalEmailOTP")}
              />
              {errors.personalEmailOTP && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.personalEmailOTP.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* WhatsApp Consent */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="whatsappConsent"
              checked={watch("whatsappConsent")}
              onCheckedChange={(checked) =>
                setValue("whatsappConsent", checked as boolean)
              }
            />
            <Label htmlFor="whatsappConsent" className="text-lg text-black font-medium">
              I consent to receive communications via WhatsApp
            </Label>
          </div>
          {errors.whatsappConsent && (
            <p className="text-red-500 text-sm">
              {errors.whatsappConsent.message}
            </p>
          )}
        </div>

        {/* Navigation Button */}
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onSkip}
            className="flex-1"
          >
            Skip for Now
          </Button>

          <Button
            type="submit"
            disabled={isLoading || !whatsappOTPSent || !personalEmailOTPSent}
            className="flex-1"
          >
            {isLoading ? "Processing..." : "Continue to Screen 1.2"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
