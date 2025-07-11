"use client";

import { useState } from "react";
import Screen1_1 from "@/components/registration/Screen1_1";
import Screen1_2 from "@/components/registration/Screen1_2";
import Screen2_1 from "@/components/registration/Screen2_1";
import Screen2_2 from "@/components/registration/Screen2_2";
import Screen2_3 from "@/components/registration/Screen2_3";

type Screen1_1Data = {
    whatsappCountryCode: string;
    whatsappNumber: string;
    whatsappOTP: string;
    companyEmail?: string;
    companyEmailOTP?: string;
    personalEmail: string;
    personalEmailOTP?: string;
    whatsappConsent: boolean;
    showCompanyEmail: boolean;
};

type Screen1_2Data = {
    instagramId?: string;
    linkedinId?: string;
    twitterId?: string;
    facebookId?: string;
    firstName: string;
    lastName: string;
    gender: "male" | "female" | "other";
    dateOfBirth: string;
    city: string;
    country: string;
    isPerformingArtist: boolean;
};

type Screen2_1Data = {
    youtubeChannelId?: string;
    imdbProfileId?: string;
    spotifyChannelId?: string;
    soundcloudChannelId?: string;
    appleMusicId?: string;
    amazonMusicId?: string;
    gaanaId?: string;
    jioSaavnId?: string;
    instagramId?: string;
    facebookId?: string;
};

type Screen2_2Data = {
    screenName: string;
    profilePicture?: string;
    profileBios: string;
    scrapedData?: string;
};

type Screen2_3Data = {
    artistCategories: string[];
    languages: string[];
    yearsPerforming: string;
    starValue: "Global Legend" | "Superstar" | "Top Performer" | "Fan Favourite" | "Rising Star" | "Emerging Talent" | "Underdog";
    hasPersonalManager: boolean;
    personalManagerName?: string;
    personalManagerCity?: string;
    personalManagerCountry?: string;
    personalManagerEmail?: string;
    personalManagerWhatsApp?: string;
    hasAgencyManagement: boolean;
    agencyName?: string;
    agencyManagerName?: string;
    agencyCity?: string;
    agencyCountry?: string;
    agencyEmail?: string;
    agencyWhatsApp?: string;
    quoteResponsibility: "I will Quote Myself" | "My Personal Manager will Quote" | "My Artist Manager will Quote";
};

type RegistrationData = {
    screen1_1: Screen1_1Data;
    screen1_2: Screen1_2Data;
    screen2_1?: Screen2_1Data;
    screen2_2?: Screen2_2Data;
    screen2_3?: Screen2_3Data;
};

export default function RegistrationPage() {
    const [currentScreen, setCurrentScreen] = useState<"1.1" | "1.2" | "2.1" | "2.2" | "2.3" | "complete">("1.1");
    const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);

    const handleScreen1_1Complete = (data: Screen1_1Data) => {
        setRegistrationData(prev => ({
            screen1_1: data,
            screen1_2: prev?.screen1_2 || {
                instagramId: "",
                linkedinId: "",
                twitterId: "",
                facebookId: "",
                firstName: "",
                lastName: "",
                gender: "male",
                dateOfBirth: "",
                city: "",
                country: "",
                isPerformingArtist: false,
            }
        }));
        setCurrentScreen("1.2");
    };

    const handleScreen1_2Complete = (data: Screen1_2Data) => {
        setRegistrationData(prev => ({
            screen1_1: prev!.screen1_1,
            screen1_2: data
        }));

        // If user is a performing artist, continue to Screen 2.1, otherwise complete
        if (data.isPerformingArtist) {
            setCurrentScreen("2.1");
        } else {
            setCurrentScreen("complete");
        }
    };

    const handleScreen2_1Complete = (data: Screen2_1Data) => {
        setRegistrationData(prev => ({
            ...prev!,
            screen2_1: data
        }));
        setCurrentScreen("2.2");
    };

    const handleScreen2_2Complete = (data: Screen2_2Data) => {
        setRegistrationData(prev => ({
            ...prev!,
            screen2_2: data
        }));
        setCurrentScreen("2.3");
    };

    const handleScreen2_3Complete = (data: Screen2_3Data) => {
        setRegistrationData(prev => ({
            ...prev!,
            screen2_3: data
        }));
        setCurrentScreen("complete");

        // Here you would typically submit the complete registration data to your API
        console.log("Complete registration data:", {
            ...registrationData?.screen1_1,
            ...registrationData?.screen1_2,
            ...registrationData?.screen2_1,
            ...registrationData?.screen2_2,
            ...data
        });
    };

    const handleBackToScreen1_1 = () => {
        setCurrentScreen("1.1");
    };

    const handleBackToScreen1_2 = () => {
        setCurrentScreen("1.2");
    };

    const handleBackToScreen2_1 = () => {
        setCurrentScreen("2.1");
    };

    const handleBackToScreen2_2 = () => {
        setCurrentScreen("2.2");
    };

    if (currentScreen === "complete") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-2xl mx-auto p-6 text-center space-y-6">
                    <div className="text-green-600">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Registration Complete!</h1>
                    <p className="text-gray-600">
                        Thank you for registering. We&apos;ve sent a confirmation to your email and WhatsApp.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg text-left">
                        <h3 className="font-semibold mb-2">Registration Summary:</h3>
                        <div className="text-sm space-y-1">
                            <p><strong>Name:</strong> {registrationData?.screen1_2.firstName} {registrationData?.screen1_2.lastName}</p>
                            <p><strong>WhatsApp:</strong> {registrationData?.screen1_1.whatsappCountryCode} {registrationData?.screen1_1.whatsappNumber}</p>
                            <p><strong>Personal Email:</strong> {registrationData?.screen1_1.personalEmail}</p>
                            {registrationData?.screen1_1.companyEmail && (
                                <p><strong>Company Email:</strong> {registrationData.screen1_1.companyEmail}</p>
                            )}
                            <p><strong>Location:</strong> {registrationData?.screen1_2.city}, {registrationData?.screen1_2.country}</p>
                            <p><strong>Performing Artist:</strong> {registrationData?.screen1_2.isPerformingArtist ? "Yes" : "No"}</p>
                            {registrationData?.screen1_2.isPerformingArtist && (
                                <>
                                    <p><strong>Screen Name:</strong> {registrationData?.screen2_2?.screenName}</p>
                                    <p><strong>Star Value:</strong> {registrationData?.screen2_3?.starValue}</p>
                                    <p><strong>Years Performing:</strong> {registrationData?.screen2_3?.yearsPerforming}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {currentScreen === "1.1" && (
                <Screen1_1
                    onNext={handleScreen1_1Complete}
                />
            )}

            {currentScreen === "1.2" && (
                <Screen1_2
                    onNext={handleScreen1_2Complete}
                    onBack={handleBackToScreen1_1}
                />
            )}

            {currentScreen === "2.1" && (
                <Screen2_1
                    onNext={handleScreen2_1Complete}
                    onBack={handleBackToScreen1_2}
                />
            )}

            {currentScreen === "2.2" && (
                <Screen2_2
                    onNext={handleScreen2_2Complete}
                    onBack={handleBackToScreen2_1}
                />
            )}

            {currentScreen === "2.3" && (
                <Screen2_3
                    onNext={handleScreen2_3Complete}
                    onBack={handleBackToScreen2_2}
                />
            )}
        </div>
    );
} 