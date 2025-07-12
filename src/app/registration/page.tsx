"use client";

import { useState } from "react";
import Screen1_1 from "@/components/registration/Screen1_1";
import Screen1_2 from "@/components/registration/Screen1_2";
import Screen2_1 from "@/components/registration/Screen2_1";
import Screen2_2 from "@/components/registration/Screen2_2";
import Screen2_3 from "@/components/registration/Screen2_3";
import Screen2_4 from "@/components/registration/Screen2_4";
import Screen2_5 from "@/components/registration/Screen2_5";
import Screen2_6 from "@/components/registration/Screen2_6";
import Screen2_7 from "@/components/registration/Screen2_7";

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

type Screen2_4Data = {
    motivationalTalk?: string;
    motivationalTalkPrice?: string;
    panelistRole?: string;
    panelistRolePrice?: string;
    soloDanceSet?: string;
    soloDanceSetPrice?: string;
    ensembleShow?: string;
    ensembleShowPrice?: string;
    arenaTheatrical?: string;
    arenaTheatricalPrice?: string;
    segmentHosting?: string;
    segmentHostingPrice?: string;
    fullShowAnchoring?: string;
    fullShowAnchoringPrice?: string;
    runwayWalk?: string;
    runwayWalkPrice?: string;
    voiceover?: string;
    voiceoverPrice?: string;
};

type Screen2_5Data = {
    actTitle: string;
    actPricing: string;
    stageLength?: string;
    stageDepth?: string;
    stageHeight?: string;
    ceilingHeight?: string;
    actDuration: string;
    durationUnit: "minutes" | "hours" | "days";
    onStageCrewSize?: string;
    backStageCrewSize?: string;
    fohCrewSize?: string;
    actReferenceVideoURL?: string;
    actReferencePhotos?: string;
};

type Screen2_6Data = {
    publicConcerts: boolean;
    publicConcertsPercentage?: string;
    publicConcertsType?: "premium" | "discount";
    weddings: boolean;
    weddingsPercentage?: string;
    weddingsType?: "premium" | "discount";
    corporateEvents: boolean;
    corporateEventsPercentage?: string;
    corporateEventsType?: "premium" | "discount";
    governmentEvents: boolean;
    governmentEventsPercentage?: string;
    governmentEventsType?: "premium" | "discount";
    collegeFest: boolean;
    collegeFestPercentage?: string;
    collegeFestType?: "premium" | "discount";
    fundraisers: boolean;
    fundraisersPercentage?: string;
    fundraisersType?: "premium" | "discount";
    awardCeremonies: boolean;
    awardCeremoniesPercentage?: string;
    awardCeremoniesType?: "premium" | "discount";
    devotionalEvents: boolean;
    devotionalEventsPercentage?: string;
    devotionalEventsType?: "premium" | "discount";
    internationalTours: boolean;
    internationalToursPercentage?: string;
    internationalToursType?: "premium" | "discount";
    horecaGigs: boolean;
    horecaGigsPercentage?: string;
    horecaGigsType?: "premium" | "discount";
};

type Screen2_7Data = {
    travelInterest: "domestic" | "international" | "notInterested";
    performedCountries?: string[];
    revenueShareCollab: boolean;
    artistCollaboration: boolean;
    merchandisingInterest: boolean;
    autoQuoteContract: boolean;
    noChargeRehearsals: boolean;
    noChargeStyling: boolean;
    noChargeSocialMedia: boolean;
    techRiderFiles?: string;
    hospitalityRiderFiles?: string;
    isArtistManager: boolean;
    managementType?: "personalManager" | "agency";
    agencyDetails?: string;
    isEventOrganizer: boolean;
    organizerType?: "individual" | "agency" | "corporate" | "organisation";
    organisationType?: string;
    organisationName?: string;
    organisationLocation?: string;
    organisationRole?: "owner" | "staff";
    organisationEmail?: string;
    organisationWhatsApp?: string;
    organisationGST?: string;
    organisationSocialHandle?: string;
};

type RegistrationData = {
    screen1_1: Screen1_1Data;
    screen1_2: Screen1_2Data;
    screen2_1?: Screen2_1Data;
    screen2_2?: Screen2_2Data;
    screen2_3?: Screen2_3Data;
    screen2_4?: Screen2_4Data;
    screen2_5?: Screen2_5Data;
    screen2_6?: Screen2_6Data;
    screen2_7?: Screen2_7Data;
};

export default function RegistrationPage() {
    const [currentScreen, setCurrentScreen] = useState<"1.1" | "1.2" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "complete">("1.1");
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

    const handleScreen1_1Skip = () => {
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

    const handleScreen1_2Skip = () => {
        setCurrentScreen("2.1");
    };

    const handleScreen2_1Complete = (data: Screen2_1Data) => {
        setRegistrationData(prev => ({
            ...prev!,
            screen2_1: data
        }));
        setCurrentScreen("2.2");
    };

    const handleScreen2_1Skip = () => {
        setCurrentScreen("2.6");
    };

    const handleScreen2_2Complete = (data: Screen2_2Data) => {
        setRegistrationData(prev => ({
            ...prev!,
            screen2_2: data
        }));
        setCurrentScreen("2.3");
    };

    const handleScreen2_2Skip = () => {
        setCurrentScreen("2.6");
    };

    const handleScreen2_3Complete = (data: Screen2_3Data) => {
        setRegistrationData(prev => ({
            ...prev!,
            screen2_3: data
        }));
        setCurrentScreen("2.4");
    };

    const handleScreen2_3Skip = () => {
        setCurrentScreen("2.6");
    };

    const handleScreen2_4Complete = (data: Screen2_4Data) => {
        setRegistrationData(prev => ({
            ...prev!,
            screen2_4: data
        }));
        setCurrentScreen("2.5");
    };

    const handleScreen2_4Skip = () => {
        setCurrentScreen("2.5");
    };

    const handleScreen2_5Complete = (data: Screen2_5Data) => {
        setRegistrationData(prev => ({
            ...prev!,
            screen2_5: data
        }));
        setCurrentScreen("2.6");
    };

    const handleScreen2_5Skip = () => {
        setCurrentScreen("2.6");
    };

    const handleScreen2_6Complete = (data: Screen2_6Data) => {
        setRegistrationData(prev => ({
            ...prev!,
            screen2_6: data
        }));
        setCurrentScreen("2.7");
    };

    const handleScreen2_6Skip = () => {
        setCurrentScreen("2.7");
    };

    const handleScreen2_7Complete = (data: Screen2_7Data) => {
        setRegistrationData(prev => ({
            ...prev!,
            screen2_7: data
        }));
        setCurrentScreen("complete");

        // Here you would typically submit the complete registration data to your API
        console.log("Complete registration data:", {
            ...registrationData?.screen1_1,
            ...registrationData?.screen1_2,
            ...registrationData?.screen2_1,
            ...registrationData?.screen2_2,
            ...registrationData?.screen2_3,
            ...registrationData?.screen2_4,
            ...registrationData?.screen2_5,
            ...registrationData?.screen2_6,
            ...data
        });
    };

    const handleScreen2_7Skip = () => {
        setCurrentScreen("complete");
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

    const handleBackToScreen2_3 = () => {
        setCurrentScreen("2.3");
    };

    const handleBackToScreen2_4 = () => {
        setCurrentScreen("2.4");
    };

    const handleBackToScreen2_5 = () => {
        setCurrentScreen("2.5");
    };

    const handleBackToScreen2_6 = () => {
        setCurrentScreen("2.6");
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
                                    <p><strong>Act Title:</strong> {registrationData?.screen2_5?.actTitle}</p>
                                    <p><strong>Travel Interest:</strong> {registrationData?.screen2_7?.travelInterest}</p>
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
                    onSkip={handleScreen1_1Skip}
                />
            )}

            {currentScreen === "1.2" && (
                <Screen1_2
                    onNext={handleScreen1_2Complete}
                    onBack={handleBackToScreen1_1}
                    onSkip={handleScreen1_2Skip}
                />
            )}

            {currentScreen === "2.1" && (
                <Screen2_1
                    onNext={handleScreen2_1Complete}
                    onBack={handleBackToScreen1_2}
                    onSkip={handleScreen2_1Skip}
                />
            )}

            {currentScreen === "2.2" && (
                <Screen2_2
                    onNext={handleScreen2_2Complete}
                    onBack={handleBackToScreen2_1}
                    onSkip={handleScreen2_2Skip}
                />
            )}

            {currentScreen === "2.3" && (
                <Screen2_3
                    onNext={handleScreen2_3Complete}
                    onBack={handleBackToScreen2_2}
                    onSkip={handleScreen2_3Skip}
                />
            )}

            {currentScreen === "2.4" && (
                <Screen2_4
                    onNext={handleScreen2_4Complete}
                    onBack={handleBackToScreen2_3}
                    onSkip={handleScreen2_4Skip}
                />
            )}

            {currentScreen === "2.5" && (
                <Screen2_5
                    onNext={handleScreen2_5Complete}
                    onBack={handleBackToScreen2_4}
                    onSkip={handleScreen2_5Skip}
                />
            )}

            {currentScreen === "2.6" && (
                <Screen2_6
                    onNext={handleScreen2_6Complete}
                    onBack={handleBackToScreen2_5}
                    onSkip={handleScreen2_6Skip}
                />
            )}

            {currentScreen === "2.7" && (
                <Screen2_7
                    onNext={handleScreen2_7Complete}
                    onBack={handleBackToScreen2_6}
                    onSkip={handleScreen2_7Skip}
                />
            )}
        </div>
    );
} 