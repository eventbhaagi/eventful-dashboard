"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Validation schema for Screen 1.1
const screen1_1Schema = z.object({
    whatsappCountryCode: z.string().min(1, "Country code is required"),
    whatsappNumber: z.string().min(10, "WhatsApp number must be at least 10 digits"),
    whatsappOTP: z.string().min(4, "OTP must be at least 4 digits"),
    companyEmail: z.string().email("Invalid email format").optional().or(z.literal("")),
    companyEmailOTP: z.string().optional().or(z.literal("")),
    personalEmail: z.string().email("Invalid email format"),
    personalEmailOTP: z.string().optional().or(z.literal("")),
    whatsappConsent: z.boolean().refine(val => val === true, "You must consent to WhatsApp messages"),
    showCompanyEmail: z.boolean().default(true),
}).refine((data) => {
    // Company email validation: Cannot be Gmail/Hotmail/Yahoo/Outlook
    if (data.companyEmail && data.companyEmail.trim() !== "") {
        const domain = data.companyEmail.split("@")[1]?.toLowerCase();
        const restrictedDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
        if (restrictedDomains.includes(domain)) {
            return false;
        }
    }
    return true;
}, {
    message: "Company email cannot be Gmail/Hotmail/Yahoo/Outlook addresses",
    path: ["companyEmail"],
}).refine((data) => {
    // Personal email validation: Only Gmail/Hotmail/Yahoo/Outlook allowed
    if (data.personalEmail && data.personalEmail.trim() !== "") {
        const domain = data.personalEmail.split("@")[1]?.toLowerCase();
        const allowedDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
        if (!allowedDomains.includes(domain)) {
            return false;
        }
    }
    return true;
}, {
    message: "Personal email must be Gmail/Hotmail/Yahoo/Outlook addresses only",
    path: ["personalEmail"],
}).refine((data) => {
    // If company email is shown and provided, OTP is mandatory
    if (data.showCompanyEmail && data.companyEmail && data.companyEmail.trim() !== "" && !data.companyEmailOTP) {
        return false;
    }
    return true;
}, {
    message: "Company email OTP is mandatory when company email is provided",
    path: ["companyEmailOTP"],
});

type Screen1_1FormData = z.infer<typeof screen1_1Schema>;

interface Screen1_1Props {
    onNext: (data: Screen1_1FormData) => void;
    isInvitedUser?: boolean;
}

export default function Screen1_1({ onNext, isInvitedUser = false }: Screen1_1Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [showWhatsAppOTP, setShowWhatsAppOTP] = useState(false);
    const [showCompanyEmailOTP, setShowCompanyEmailOTP] = useState(false);
    const [showPersonalEmailOTP, setShowPersonalEmailOTP] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger,
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
            showCompanyEmail: true, // Default to true to show company email
        },
    });

    const watchedCompanyEmail = watch("companyEmail");
    const watchedPersonalEmail = watch("personalEmail");
    const showCompanyEmail = watch("showCompanyEmail");

    const sendOTP = async (type: "whatsapp" | "companyEmail" | "personalEmail") => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            switch (type) {
                case "whatsapp":
                    setShowWhatsAppOTP(true);
                    break;
                case "companyEmail":
                    setShowCompanyEmailOTP(true);
                    break;
                case "personalEmail":
                    setShowPersonalEmailOTP(true);
                    break;
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data: Screen1_1FormData) => {
        setIsLoading(true);
        try {
            // Additional validation checks
            const isValid = await trigger();
            if (!isValid) {
                throw new Error("Please fix the validation errors");
            }

            // If company email is shown and provided, it's mandatory
            if (showCompanyEmail && (!data.companyEmail || data.companyEmail.trim() === "")) {
                throw new Error("Company email is required when enabled");
            }

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
                {/* WhatsApp Number Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold">WhatsApp Number</h2>
                        <span className="text-red-500">*</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="whatsappCountryCode">Country Code</Label>
                            <Select
                                value={watch("whatsappCountryCode")}
                                onValueChange={(value) => setValue("whatsappCountryCode", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="+91">+91 (India)</SelectItem>
                                    <SelectItem value="+1">+1 (USA/Canada)</SelectItem>
                                    <SelectItem value="+44">+44 (UK)</SelectItem>
                                    <SelectItem value="+61">+61 (Australia)</SelectItem>
                                    <SelectItem value="+86">+86 (China)</SelectItem>
                                    <SelectItem value="+81">+81 (Japan)</SelectItem>
                                    <SelectItem value="+49">+49 (Germany)</SelectItem>
                                    <SelectItem value="+33">+33 (France)</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.whatsappCountryCode && (
                                <p className="text-red-500 text-sm mt-1">{errors.whatsappCountryCode.message}</p>
                            )}
                        </div>

                        <div className="col-span-2">
                            <Label htmlFor="whatsappNumber">Mobile Number</Label>
                            <Input
                                id="whatsappNumber"
                                type="tel"
                                placeholder="Enter mobile number"
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
                        onClick={() => sendOTP("whatsapp")}
                        disabled={isLoading || !watch("whatsappNumber")}
                        className="w-full"
                    >
                        {isLoading ? "Sending..." : "Send WhatsApp OTP"}
                    </Button>

                    {showWhatsAppOTP && (
                        <div>
                            <Label htmlFor="whatsappOTP">WhatsApp OTP</Label>
                            <Input
                                id="whatsappOTP"
                                type="text"
                                placeholder="Enter OTP"
                                {...register("whatsappOTP")}
                            />
                            {errors.whatsappOTP && (
                                <p className="text-red-500 text-sm mt-1">{errors.whatsappOTP.message}</p>
                            )}
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="whatsappConsent"
                            checked={watch("whatsappConsent")}
                            onCheckedChange={(checked) => setValue("whatsappConsent", checked as boolean)}
                        />
                        <Label htmlFor="whatsappConsent" className="text-sm">
                            I consent to receive WhatsApp messages for verification and updates
                        </Label>
                    </div>
                    {errors.whatsappConsent && (
                        <p className="text-red-500 text-sm">{errors.whatsappConsent.message}</p>
                    )}
                </div>

                {/* Company Email Toggle */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="showCompanyEmail"
                            checked={showCompanyEmail}
                            onCheckedChange={(checked) => setValue("showCompanyEmail", checked as boolean)}
                        />
                        <Label htmlFor="showCompanyEmail" className="text-lg font-medium">
                            I have a company email (invited user)
                        </Label>
                    </div>
                    <p className="text-sm text-gray-600">
                        Check this if you were invited by someone with a custom domain email
                    </p>
                </div>

                {/* Company Email Section - Only visible if checkbox is checked */}
                {showCompanyEmail && (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <h2 className="text-xl font-semibold">Company Email Address</h2>
                            <span className="text-red-500">*</span>
                        </div>

                        <div>
                            <Label htmlFor="companyEmail">Email Address</Label>
                            <Input
                                id="companyEmail"
                                type="email"
                                placeholder="Enter company email (custom domain only)"
                                {...register("companyEmail")}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Cannot be Gmail/Hotmail/Yahoo/Outlook addresses. OTP Validation is Mandatory.
                            </p>
                            {errors.companyEmail && (
                                <p className="text-red-500 text-sm mt-1">{errors.companyEmail.message}</p>
                            )}
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => sendOTP("companyEmail")}
                            disabled={isLoading || !watch("companyEmail")}
                            className="w-full"
                        >
                            {isLoading ? "Sending..." : "Send Company Email OTP"}
                        </Button>

                        {showCompanyEmailOTP && (
                            <div>
                                <Label htmlFor="companyEmailOTP">Company Email OTP</Label>
                                <Input
                                    id="companyEmailOTP"
                                    type="text"
                                    placeholder="Enter OTP"
                                    {...register("companyEmailOTP")}
                                />
                                {errors.companyEmailOTP && (
                                    <p className="text-red-500 text-sm mt-1">{errors.companyEmailOTP.message}</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Personal Email Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold">Personal Email Address</h2>
                        <span className="text-red-500">*</span>
                    </div>

                    <div>
                        <Label htmlFor="personalEmail">Email Address</Label>
                        <Input
                            id="personalEmail"
                            type="email"
                            placeholder="Enter personal email (Gmail/Hotmail/Yahoo/Outlook only)"
                            {...register("personalEmail")}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Only Gmail/Hotmail/Yahoo/Outlook addresses allowed. OTP Validation Not Mandatory at this step.
                        </p>
                        {errors.personalEmail && (
                            <p className="text-red-500 text-sm mt-1">{errors.personalEmail.message}</p>
                        )}
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => sendOTP("personalEmail")}
                        disabled={isLoading || !watch("personalEmail")}
                        className="w-full"
                    >
                        {isLoading ? "Sending..." : "Send Personal Email OTP (Optional)"}
                    </Button>

                    {showPersonalEmailOTP && (
                        <div>
                            <Label htmlFor="personalEmailOTP">Personal Email OTP (Optional)</Label>
                            <Input
                                id="personalEmailOTP"
                                type="text"
                                placeholder="Enter OTP (optional)"
                                {...register("personalEmailOTP")}
                            />
                            {errors.personalEmailOTP && (
                                <p className="text-red-500 text-sm mt-1">{errors.personalEmailOTP.message}</p>
                            )}
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? "Processing..." : "Continue to Screen 1.2"}
                </Button>
            </form>
        </div>
    );
} 