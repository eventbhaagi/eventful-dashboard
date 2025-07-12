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
import { Textarea } from "@/components/ui/textarea";

// Validation schema for Screen 2.7
const screen2_7Schema = z.object({
    // Travel preferences
    travelInterest: z.enum(["domestic", "international", "notInterested"]),
    performedCountries: z.array(z.string()),

    // Collaboration preferences
    revenueShareCollab: z.boolean(),
    artistCollaboration: z.boolean(),
    merchandisingInterest: z.boolean(),
    autoQuoteContract: z.boolean(),

    // Service preferences
    noChargeRehearsals: z.boolean(),
    noChargeStyling: z.boolean(),
    noChargeSocialMedia: z.boolean(),

    // File uploads
    techRiderFiles: z.string().optional(),
    hospitalityRiderFiles: z.string().optional(),

    // Artist Manager section
    isArtistManager: z.boolean(),
    managementType: z.enum(["personalManager", "agency"]),
    agencyDetails: z.string().optional(),

    // Event Organizer section
    isEventOrganizer: z.boolean(),
    organizerType: z.enum(["individual", "agency", "corporate", "organisation"]),
    organisationType: z.string().optional(),
    organisationName: z.string().optional(),
    organisationLocation: z.string().optional(),
    organisationRole: z.enum(["owner", "staff"]).optional(),
    organisationEmail: z.string().email("Invalid email format").optional(),
    organisationWhatsApp: z.string().optional(),
    organisationGST: z.string().optional(),
    organisationSocialHandle: z.string().optional(),
});

type Screen2_7FormData = z.infer<typeof screen2_7Schema>;

interface Screen2_7Props {
    onNext: (data: Screen2_7FormData) => void;
    onBack: () => void;
    onSkip: () => void;
}

export default function Screen2_7({ onNext, onBack, onSkip }: Screen2_7Props) {
    const [isLoading, setIsLoading] = useState(false);
    const availableCountries = [
        "India", "USA", "UK", "Canada", "Australia", "Germany", "France", "Japan", "China", "Singapore",
        "UAE", "South Africa", "Brazil", "Mexico", "Netherlands", "Sweden", "Norway", "Denmark", "Switzerland"
    ];

    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<Screen2_7FormData>({
        resolver: zodResolver(screen2_7Schema),
        defaultValues: {
            travelInterest: "domestic",
            performedCountries: [],
            revenueShareCollab: false,
            artistCollaboration: false,
            merchandisingInterest: false,
            autoQuoteContract: false,
            noChargeRehearsals: false,
            noChargeStyling: false,
            noChargeSocialMedia: false,
            techRiderFiles: "",
            hospitalityRiderFiles: "",
            isArtistManager: false,
            managementType: "personalManager",
            agencyDetails: "",
            isEventOrganizer: false,
            organizerType: "individual",
            organisationType: "",
            organisationName: "",
            organisationLocation: "",
            organisationRole: "owner",
            organisationEmail: "",
            organisationWhatsApp: "",
            organisationGST: "",
            organisationSocialHandle: "",
        },
    });

    const watchedValues = watch();
    const travelInterest = watchedValues.travelInterest;
    const isArtistManager = watchedValues.isArtistManager;
    const isEventOrganizer = watchedValues.isEventOrganizer;

    const handleCountryAdd = (country: string) => {
        const currentCountries = watch("performedCountries") || [];
        if (!currentCountries.includes(country)) {
            setValue("performedCountries", [...currentCountries, country]);
        }
    };

    const handleCountryRemove = (country: string) => {
        const currentCountries = watch("performedCountries") || [];
        setValue("performedCountries", currentCountries.filter(c => c !== country));
    };

    const onSubmit = async (data: Screen2_7FormData) => {
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
        <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Performing Artist Registration</h1>
                <p className="text-gray-600">Screen 2.7 - Additional Preferences & Requirements</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Travel Preferences */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Travel Preferences</h2>

                    <div>
                        <Label htmlFor="travelInterest">Are you interested to Travel for your LIVE Performances?</Label>
                        <Select
                            value={travelInterest}
                            onValueChange={(value) => setValue("travelInterest", value as "domestic" | "international" | "notInterested")}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="domestic">Only Domestic Travel</SelectItem>
                                <SelectItem value="international">Open to International Travel</SelectItem>
                                <SelectItem value="notInterested">Not Interested in Travelling</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {travelInterest === "international" && (
                        <div className="space-y-4">
                            <Label>Countries you have already performed LIVE?</Label>
                            <div className="flex flex-wrap gap-2">
                                {(watch("performedCountries") || []).map((country) => (
                                    <span
                                        key={country}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center space-x-1"
                                    >
                                        <span>{country}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleCountryRemove(country)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {availableCountries.map((country) => (
                                    <button
                                        key={country}
                                        type="button"
                                        onClick={() => handleCountryAdd(country)}
                                        disabled={(watch("performedCountries") || []).includes(country)}
                                        className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {country}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Collaboration Preferences */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Collaboration & Business Preferences</h2>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="revenueShareCollab"
                                checked={watch("revenueShareCollab")}
                                onCheckedChange={(checked) => setValue("revenueShareCollab", checked as boolean)}
                            />
                            <Label htmlFor="revenueShareCollab">Are you interested in Revenue Share Collab Deals, for Ticketed Events?</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="artistCollaboration"
                                checked={watch("artistCollaboration")}
                                onCheckedChange={(checked) => setValue("artistCollaboration", checked as boolean)}
                            />
                            <Label htmlFor="artistCollaboration">Are you interested in Collaborating with other Artists Online/Offline?</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="merchandisingInterest"
                                checked={watch("merchandisingInterest")}
                                onCheckedChange={(checked) => setValue("merchandisingInterest", checked as boolean)}
                            />
                            <Label htmlFor="merchandisingInterest">Are you interested in exploring other revenue streams like Merchandising?</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="autoQuoteContract"
                                checked={watch("autoQuoteContract")}
                                onCheckedChange={(checked) => setValue("autoQuoteContract", checked as boolean)}
                            />
                            <Label htmlFor="autoQuoteContract">Would you be interested to contract with Artist RSVP to Auto-Quote?</Label>
                        </div>
                    </div>
                </div>

                {/* Service Preferences */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Service Preferences</h2>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="noChargeRehearsals"
                                checked={watch("noChargeRehearsals")}
                                onCheckedChange={(checked) => setValue("noChargeRehearsals", checked as boolean)}
                            />
                            <Label htmlFor="noChargeRehearsals">Clients won&apos;t be charged for your Rehearsals / Fittings / Tech Walk / Sound Check?</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="noChargeStyling"
                                checked={watch("noChargeStyling")}
                                onCheckedChange={(checked) => setValue("noChargeStyling", checked as boolean)}
                            />
                            <Label htmlFor="noChargeStyling">Clients won&apos;t be charged for your MUA / Hair Stylist / Fashion Stylist, as Add-On?</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="noChargeSocialMedia"
                                checked={watch("noChargeSocialMedia")}
                                onCheckedChange={(checked) => setValue("noChargeSocialMedia", checked as boolean)}
                            />
                            <Label htmlFor="noChargeSocialMedia">Clients won&apos;t be charged for One PreEvent and One PostEvent Social Media Post?</Label>
                        </div>
                    </div>
                </div>

                {/* File Uploads */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Technical Requirements</h2>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="techRiderFiles">Please upload your Tech Rider with Staging Requirements</Label>
                            <Input
                                id="techRiderFiles"
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx"
                                {...register("techRiderFiles")}
                            />
                            <p className="text-sm text-gray-500 mt-1">Max 3 files allowed</p>
                        </div>

                        <div>
                            <Label htmlFor="hospitalityRiderFiles">Please upload your Hospitality Rider with TBL Requirements</Label>
                            <Input
                                id="hospitalityRiderFiles"
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx"
                                {...register("hospitalityRiderFiles")}
                            />
                            <p className="text-sm text-gray-500 mt-1">Max 3 files allowed</p>
                        </div>
                    </div>
                </div>

                {/* Artist Manager Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isArtistManager"
                            checked={isArtistManager}
                            onCheckedChange={(checked) => setValue("isArtistManager", checked as boolean)}
                        />
                        <Label htmlFor="isArtistManager" className="text-lg font-medium">
                            I&apos;m an Artist Manager
                        </Label>
                    </div>
                    <p className="text-sm text-gray-600">
                        Skip this section if checkbox isn&apos;t &apos;checked&apos;
                    </p>

                    {isArtistManager && (
                        <div className="space-y-4 p-4 border rounded-lg">
                            <h3 className="font-semibold">Artist Management Details</h3>

                            <div>
                                <Label htmlFor="managementType">How do you Manage Artists?</Label>
                                <Select
                                    value={watch("managementType") || "personalManager"}
                                    onValueChange={(value) => setValue("managementType", value as "personalManager" | "agency")}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personalManager">As a Personal Manager of an Artist</SelectItem>
                                        <SelectItem value="agency">With an Artist Management Agency</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="agencyDetails">Please give details of your Agency</Label>
                                <Textarea
                                    id="agencyDetails"
                                    placeholder="Artist Management Agency Name - Your Role [Owner-Partner / Staff-Member] - City, Country - Email Address - WhatsApp Number"
                                    rows={3}
                                    {...register("agencyDetails")}
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Only Custom Domain Emails are accepted. Also WhatsApp Number could be different for work use - so label it as &quot;WorkPhone&quot;
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Event Organizer Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isEventOrganizer"
                            checked={isEventOrganizer}
                            onCheckedChange={(checked) => setValue("isEventOrganizer", checked as boolean)}
                        />
                        <Label htmlFor="isEventOrganizer" className="text-lg font-medium">
                            I Organise Events (Event Organiser)
                        </Label>
                    </div>
                    <p className="text-sm text-gray-600">
                        Skip this section if checkbox isn&apos;t &apos;checked&apos;
                    </p>

                    {isEventOrganizer && (
                        <div className="space-y-4 p-4 border rounded-lg">
                            <h3 className="font-semibold">Event Organization Details</h3>

                            <div>
                                <Label htmlFor="organizerType">How do you Organise Events?</Label>
                                <Select
                                    value={watch("organizerType") || "individual"}
                                    onValueChange={(value) => setValue("organizerType", value as "individual" | "agency" | "corporate" | "organisation")}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="individual">As an Individual</SelectItem>
                                        <SelectItem value="agency">As an Event Management Agency</SelectItem>
                                        <SelectItem value="corporate">As a Corporate</SelectItem>
                                        <SelectItem value="organisation">As an Organisation</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-gray-500 mt-1">Skip the next step if selected &quot;As an Individual&quot;</p>
                            </div>

                            {watch("organizerType") !== "individual" && (
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="organisationType">Your Organisation Type</Label>
                                        <Select
                                            value={watch("organisationType") || ""}
                                            onValueChange={(value) => setValue("organisationType", value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select organisation type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="eventManagement">Event Management Company (Planner)</SelectItem>
                                                <SelectItem value="eventSupport">Event Support Company (Suppliers)</SelectItem>
                                                <SelectItem value="corporate">Corporate or Brand</SelectItem>
                                                <SelectItem value="mediaOwner">Media Owner or Publisher</SelectItem>
                                                <SelectItem value="venue">Event Venue or HoReCa</SelectItem>
                                                <SelectItem value="otherForProfit">Other For-Profit Company</SelectItem>
                                                <SelectItem value="socialClub">Social Club</SelectItem>
                                                <SelectItem value="tradeAssociation">Trade Association</SelectItem>
                                                <SelectItem value="charitableNGO">Charitable NGO</SelectItem>
                                                <SelectItem value="academic">Academic Institution</SelectItem>
                                                <SelectItem value="government">Government Department</SelectItem>
                                                <SelectItem value="publicSector">Public Sector Company</SelectItem>
                                                <SelectItem value="otherNonProfit">Other Non-Profit Organisation</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="organisationName">Your Organisation Name</Label>
                                        <Input
                                            id="organisationName"
                                            placeholder="Name of Organisation"
                                            {...register("organisationName")}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="organisationLocation">Your Office Location (City, Country)</Label>
                                        <Input
                                            id="organisationLocation"
                                            placeholder="City, Country"
                                            {...register("organisationLocation")}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="organisationRole">Your Role in Organisation</Label>
                                        <Select
                                            value={watch("organisationRole") || "owner"}
                                            onValueChange={(value) => setValue("organisationRole", value as "owner" | "staff")}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="owner">Owner-Partner</SelectItem>
                                                <SelectItem value="staff">Staff-Member</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="organisationEmail">Your Official Email Address</Label>
                                        <Input
                                            id="organisationEmail"
                                            type="email"
                                            placeholder="Email Address"
                                            {...register("organisationEmail")}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="organisationWhatsApp">Your Official WhatsApp Number</Label>
                                        <Input
                                            id="organisationWhatsApp"
                                            placeholder="WhatsApp Number"
                                            {...register("organisationWhatsApp")}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="organisationGST">Your Organisation GST Number</Label>
                                        <Input
                                            id="organisationGST"
                                            placeholder="GST Number"
                                            {...register("organisationGST")}
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Only Ask if this Company is based in India</p>
                                    </div>

                                    <div>
                                        <Label htmlFor="organisationSocialHandle">Your Organisation Social Network Handle</Label>
                                        <Input
                                            id="organisationSocialHandle"
                                            placeholder="Social Network Handle"
                                            {...register("organisationSocialHandle")}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        className="flex-1"
                    >
                        Back to Screen 2.6
                    </Button>

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
                        disabled={isLoading}
                        className="flex-1"
                    >
                        {isLoading ? "Processing..." : "Complete Registration"}
                    </Button>
                </div>
            </form>
        </div>
    );
} 