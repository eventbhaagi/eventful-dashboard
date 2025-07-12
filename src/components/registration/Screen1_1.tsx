"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Validation schema for Screen 1.1
const screen1_1Schema = z.object({
    whatsappCountryCode: z.string().min(1, "Country code is required"),
    whatsappNumber: z.string().min(10, "WhatsApp number must be at least 10 digits"),
    whatsappOTP: z.string().min(4, "OTP must be 4 digits"),
    companyEmail: z.string().email("Invalid email format").optional(),
    companyEmailOTP: z.string().min(4, "OTP must be 4 digits").optional(),
    personalEmail: z.string().email("Invalid email format"),
    personalEmailOTP: z.string().min(4, "OTP must be 4 digits"),
    whatsappConsent: z.boolean(),
    showCompanyEmail: z.boolean(),
}).refine((data) => {
    // If company email is provided, OTP is required
    if (data.companyEmail && data.companyEmail.trim() !== "") {
        return data.companyEmailOTP && data.companyEmailOTP.trim() !== "";
    }
    return true;
}, {
    message: "Company email OTP is required when company email is provided",
    path: ["companyEmailOTP"],
}).refine((data) => {
    // Personal email OTP is always required
    return data.personalEmailOTP && data.personalEmailOTP.trim() !== "";
}, {
    message: "Personal email OTP is required",
    path: ["personalEmailOTP"],
});

type Screen1_1FormData = z.infer<typeof screen1_1Schema>;

interface Screen1_1Props {
    onNext: (data: Screen1_1FormData) => void;
    onSkip: () => void;
}

export default function Screen1_1({ onNext, onSkip }: Screen1_1Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [whatsappOTPSent, setWhatsappOTPSent] = useState(false);
    const [companyEmailOTPSent, setCompanyEmailOTPSent] = useState(false);
    const [personalEmailOTPSent, setPersonalEmailOTPSent] = useState(false);

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
            // Simulate API call to send OTP
            await new Promise(resolve => setTimeout(resolve, 1000));
            setWhatsappOTPSent(true);
            alert("OTP sent to your WhatsApp number");
        } catch (error) {
            console.error("Error sending WhatsApp OTP:", error);
            alert("Failed to send OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const sendCompanyEmailOTP = async () => {
        const companyEmail = watch("companyEmail");
        if (!companyEmail || !companyEmail.includes("@")) {
            alert("Please enter a valid company email");
            return;
        }

        // Check if it's a generic domain (not custom domain)
        const domain = companyEmail.split("@")[1];
        const genericDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
        if (!genericDomains.includes(domain.toLowerCase())) {
            alert("Company email must use a generic domain (Gmail, Yahoo, Hotmail, etc.)");
            return;
        }

        setIsLoading(true);
        try {
            // Simulate API call to send OTP
            await new Promise(resolve => setTimeout(resolve, 1000));
            setCompanyEmailOTPSent(true);
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
        const genericDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
        if (genericDomains.includes(domain.toLowerCase())) {
            alert("Personal email must use a custom domain (not Gmail, Yahoo, Hotmail, etc.)");
            return;
        }

        setIsLoading(true);
        try {
            // Simulate API call to send OTP
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPersonalEmailOTPSent(true);
            alert("OTP sent to your personal email");
        } catch (error) {
            console.error("Error sending personal email OTP:", error);
            alert("Failed to send OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

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
        <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">User Registration</h1>
                <p className="text-gray-600">Screen 1.1 - Contact Information</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* WhatsApp Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold">WhatsApp Number</h2>
                        <span className="text-red-500">*</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        We&apos;ll send you an OTP to verify your WhatsApp number
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="whatsappCountryCode">Country Code</Label>
                            <Input
                                id="whatsappCountryCode"
                                placeholder="+91"
                                {...register("whatsappCountryCode")}
                            />
                            {errors.whatsappCountryCode && (
                                <p className="text-red-500 text-sm mt-1">{errors.whatsappCountryCode.message}</p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                            <Input
                                id="whatsappNumber"
                                type="tel"
                                placeholder="Enter your WhatsApp number"
                                {...register("whatsappNumber")}
                            />
                            {errors.whatsappNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber.message}</p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={sendWhatsAppOTP}
                        disabled={isLoading || !watch("whatsappNumber")}
                        className="w-full"
                    >
                        {isLoading ? "Sending..." : "Send WhatsApp OTP"}
                    </Button>

                    {whatsappOTPSent && (
                        <div>
                            <Label htmlFor="whatsappOTP">Enter OTP</Label>
                            <Input
                                id="whatsappOTP"
                                placeholder="Enter 4-digit OTP"
                                maxLength={4}
                                {...register("whatsappOTP")}
                            />
                            {errors.whatsappOTP && (
                                <p className="text-red-500 text-sm mt-1">{errors.whatsappOTP.message}</p>
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
                            onCheckedChange={(checked) => setValue("showCompanyEmail", checked as boolean)}
                        />
                        <Label htmlFor="showCompanyEmail" className="text-lg font-medium">
                            I have a Company Email
                        </Label>
                    </div>

                    {showCompanyEmail && (
                        <>
                            <div>
                                <Label htmlFor="companyEmail">Company Email</Label>
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
                                    <p className="text-red-500 text-sm mt-1">{errors.companyEmail.message}</p>
                                )}
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={sendCompanyEmailOTP}
                                disabled={isLoading || !watch("companyEmail")}
                                className="w-full"
                            >
                                {isLoading ? "Sending..." : "Send Company Email OTP"}
                            </Button>

                            {companyEmailOTPSent && (
                                <div>
                                    <Label htmlFor="companyEmailOTP">Enter Company Email OTP</Label>
                                    <Input
                                        id="companyEmailOTP"
                                        placeholder="Enter 4-digit OTP"
                                        maxLength={4}
                                        {...register("companyEmailOTP")}
                                    />
                                    {errors.companyEmailOTP && (
                                        <p className="text-red-500 text-sm mt-1">{errors.companyEmailOTP.message}</p>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Personal Email Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold">Personal Email</h2>
                        <span className="text-red-500">*</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Must use custom domain (not Gmail, Yahoo, Hotmail, etc.)
                    </p>

                    <div>
                        <Label htmlFor="personalEmail">Personal Email</Label>
                        <Input
                            id="personalEmail"
                            type="email"
                            placeholder="Enter your personal email (custom domain only)"
                            {...register("personalEmail")}
                        />
                        {errors.personalEmail && (
                            <p className="text-red-500 text-sm mt-1">{errors.personalEmail.message}</p>
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
                                <p className="text-red-500 text-sm mt-1">{errors.personalEmailOTP.message}</p>
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
                            onCheckedChange={(checked) => setValue("whatsappConsent", checked as boolean)}
                        />
                        <Label htmlFor="whatsappConsent" className="text-lg font-medium">
                            I consent to receive communications via WhatsApp
                        </Label>
                    </div>
                    {errors.whatsappConsent && (
                        <p className="text-red-500 text-sm">{errors.whatsappConsent.message}</p>
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
        </div>
    );
} 