"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Validation schema for Screen 2.2
const screen2_2Schema = z.object({
    screenName: z.string().min(1, "Screen name is required"),
    profilePicture: z.string().optional(),
    profileBios: z.string().min(1, "Profile bios are required"),
    scrapedData: z.string().optional(),
});

type Screen2_2FormData = z.infer<typeof screen2_2Schema>;

interface Screen2_2Props {
    onNext: (data: Screen2_2FormData) => void;
    onBack: () => void;
    screen2_1Data?: any; // Data from previous screen for scraping
}

export default function Screen2_2({ onNext, onBack, screen2_1Data }: Screen2_2Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isScraping, setIsScraping] = useState(false);
    const [scrapedInfo, setScrapedInfo] = useState<any>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<Screen2_2FormData>({
        resolver: zodResolver(screen2_2Schema),
        defaultValues: {
            screenName: "",
            profilePicture: "",
            profileBios: "",
            scrapedData: "",
        },
    });

    // Simulate scraping data from social media platforms
    const scrapeArtistData = async () => {
        setIsScraping(true);
        try {
            // Simulate API call to scrape data from social platforms
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock scraped data - in real app, this would come from actual scraping
            const mockScrapedData = {
                screenName: "ArtistName123",
                profilePicture: "https://example.com/profile.jpg",
                profileBios: "Professional performing artist with 10+ years of experience in live stage performances. Specializing in contemporary dance and theatrical arts. Winner of multiple awards and recognized for innovative performances across various venues.",
                additionalInfo: "Found on: YouTube, Instagram, Facebook\nFollowers: 50K+\nGenre: Contemporary Dance\nLocation: Mumbai, India"
            };

            setScrapedInfo(mockScrapedData);

            // Auto-fill the form with scraped data
            setValue("screenName", mockScrapedData.screenName);
            setValue("profilePicture", mockScrapedData.profilePicture);
            setValue("profileBios", mockScrapedData.profileBios);
            setValue("scrapedData", mockScrapedData.additionalInfo);

        } catch (error) {
            console.error("Error scraping data:", error);
        } finally {
            setIsScraping(false);
        }
    };

    const onSubmit = async (data: Screen2_2FormData) => {
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
                <h1 className="text-3xl font-bold">Performing Artist Registration</h1>
                <p className="text-gray-600">Screen 2.2 - Artist Identification</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Scraping Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold">Help us if we have identified you correctly?</h2>
                    </div>
                    <p className="text-sm text-gray-600">
                        System should initiate Scrappers to fetch some information about this Artist.
                    </p>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={scrapeArtistData}
                        disabled={isScraping}
                        className="w-full"
                    >
                        {isScraping ? "Scraping data..." : "Fetch Artist Data from Social Platforms"}
                    </Button>

                    {scrapedInfo && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h3 className="font-semibold text-green-800 mb-2">✓ Data Successfully Scraped</h3>
                            <p className="text-sm text-green-700">
                                Found artist information from your social media profiles. You can edit the auto-filled data below.
                            </p>
                        </div>
                    )}
                </div>

                {/* Artist Information Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Artist Information</h3>
                    <p className="text-sm text-gray-600">
                        Auto-Filled - Editable Field
                    </p>

                    <div>
                        <Label htmlFor="screenName">Your Screen Name</Label>
                        <Input
                            id="screenName"
                            placeholder="Enter your screen name"
                            {...register("screenName")}
                        />
                        {errors.screenName && (
                            <p className="text-red-500 text-sm mt-1">{errors.screenName.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="profilePicture">Your Profile Picture</Label>
                        <Input
                            id="profilePicture"
                            type="url"
                            placeholder="Enter profile picture URL or upload file"
                            {...register("profilePicture")}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Auto-Filled - Editable Field
                        </p>
                        {errors.profilePicture && (
                            <p className="text-red-500 text-sm mt-1">{errors.profilePicture.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="profileBios">Your Profile Bios</Label>
                        <Textarea
                            id="profileBios"
                            placeholder="Enter your professional bios"
                            rows={4}
                            {...register("profileBios")}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Auto-Filled - Editable Field
                        </p>
                        {errors.profileBios && (
                            <p className="text-red-500 text-sm mt-1">{errors.profileBios.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="scrapedData">Additional Information from Scrapers</Label>
                        <Textarea
                            id="scrapedData"
                            placeholder="Additional information found from social platforms"
                            rows={3}
                            {...register("scrapedData")}
                            readOnly
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Read-only information gathered from your social media profiles
                        </p>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        className="flex-1"
                    >
                        Back to Screen 2.1
                    </Button>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1"
                    >
                        {isLoading ? "Processing..." : "Continue to Screen 2.3"}
                    </Button>
                </div>
            </form>
        </div>
    );
} 