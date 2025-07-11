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

// TODO: Update this schema with the correct fields from Excel sheet
// Validation schema for Screen1.2 - Additional Information
const Screen1_2Schema = z.object({
    // Add the correct fields here based on Excel sheet
    field1: z.string().min(1, "This field is required"),
    field2: z.string().min(1, "This field is required"),
    field3: z.string().min(1, "This field is required"),
});

type Screen1_2FormData = z.infer<typeof Screen1_2Schema>;

interface Screen1_2Props {
    onNext: (data: Screen1_2FormData) => void;
    onBack: () => void;
    initialData?: Partial<Screen1_2FormData>;
}

const Screen1_2: React.FC<Screen1_2Props> = ({ onNext, onBack, initialData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<Screen1_2FormData>({
        resolver: zodResolver(Screen1_2Schema),
        defaultValues: {
            field1: initialData?.field1 || "",
            field2: initialData?.field2 || "",
            field3: initialData?.field3 || "",
        },
    });

    const onSubmit = async (data: Screen1_2FormData) => {
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
                        Additional Information
                    </h1>
                    <p className="text-gray-600">
                        Step 2 of 2: Please provide additional details
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* TODO: Add the correct fields from Excel sheet */}
                        <div className="text-center text-gray-500">
                            <p>Please specify what fields should be included in Screen1.2 from the Excel sheet.</p>
                            <p>Current fields: field1, field2, field3 (placeholders)</p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onBack}
                                className="px-8 py-2"
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary hover:bg-primary/90 text-white px-8 py-2"
                            >
                                {isSubmitting ? "Processing..." : "Complete Registration"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardBox>
        </div>
    );
};

export default Screen1_2; 