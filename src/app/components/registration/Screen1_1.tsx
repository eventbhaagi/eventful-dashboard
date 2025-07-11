"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import CardBox from "../shared/CardBox";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

// Validation schema for Screen1.1 - Contact Information
const Screen1_1Schema = z.object({
    whatsappNumber: z
        .string()
        .min(10, "WhatsApp number must be at least 10 digits")
        .max(15, "WhatsApp number must be less than 15 digits")
        .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid WhatsApp number"),
    companyEmail: z
        .string()
        .email("Please enter a valid company email address")
        .min(5, "Company email must be at least 5 characters")
        .max(100, "Company email must be less than 100 characters"),
    personalEmail: z
        .string()
        .email("Please enter a valid personal email address")
        .min(5, "Personal email must be at least 5 characters")
        .max(100, "Personal email must be less than 100 characters"),
});

type Screen1_1FormData = z.infer<typeof Screen1_1Schema>;

interface Screen1_1Props {
    onNext: (data: Screen1_1FormData) => void;
    initialData?: Partial<Screen1_1FormData>;
}

const Screen1_1: React.FC<Screen1_1Props> = ({ onNext, initialData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<Screen1_1FormData>({
        resolver: zodResolver(Screen1_1Schema),
        defaultValues: {
            whatsappNumber: initialData?.whatsappNumber || "",
            companyEmail: initialData?.companyEmail || "",
            personalEmail: initialData?.personalEmail || "",
        },
    });

    const onSubmit = async (data: Screen1_1FormData) => {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            onNext(data);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <CardBox className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Contact Information
                    </h1>
                    <p className="text-gray-600">
                        Step 1 of 2: Please provide your contact details
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* WhatsApp Number */}
                        <FormField
                            control={form.control}
                            name="whatsappNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>WhatsApp Number *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="Enter your WhatsApp number (e.g., +1234567890)"
                                            {...field}
                                            className="form-control"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Company Email */}
                        <FormField
                            control={form.control}
                            name="companyEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Email Address *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your company email address"
                                            {...field}
                                            className="form-control"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Personal Email */}
                        <FormField
                            control={form.control}
                            name="personalEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Personal Email Address *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your personal email address"
                                            {...field}
                                            className="form-control"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <div className="flex justify-end pt-6">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary hover:bg-primary/90 text-white px-8 py-2"
                            >
                                {isSubmitting ? "Processing..." : "Continue to Next Step"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardBox>
        </div>
    );
};

export default Screen1_1; 