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

// Validation schema for Screen 2.3
const screen2_3Schema = z.object({
    // Artist Category
    artistCategories: z.array(z.string()).min(1, "At least one artist category is required"),

    // Languages
    languages: z.array(z.string()).min(1, "At least one language is required"),

    // Years performing
    yearsPerforming: z.string().min(1, "Years performing is required"),

    // Star value positioning
    starValue: z.enum(["Global Legend", "Superstar", "Top Performer", "Fan Favourite", "Rising Star", "Emerging Talent", "Underdog"]),

    // Personal Manager
    hasPersonalManager: z.boolean(),
    personalManagerName: z.string().optional(),
    personalManagerCity: z.string().optional(),
    personalManagerCountry: z.string().optional(),
    personalManagerEmail: z.string().email("Invalid email format").optional(),
    personalManagerWhatsApp: z.string().optional(),

    // Agency Management
    hasAgencyManagement: z.boolean(),
    agencyName: z.string().optional(),
    agencyManagerName: z.string().optional(),
    agencyCity: z.string().optional(),
    agencyCountry: z.string().optional(),
    agencyEmail: z.string().email("Invalid email format").optional(),
    agencyWhatsApp: z.string().optional(),

    // Quote responsibility
    quoteResponsibility: z.enum(["I will Quote Myself", "My Personal Manager will Quote", "My Artist Manager will Quote"]),
}).refine((data) => {
    // If has personal manager, personal manager details are required
    if (data.hasPersonalManager) {
        return data.personalManagerName && data.personalManagerCity && data.personalManagerCountry && data.personalManagerEmail && data.personalManagerWhatsApp;
    }
    return true;
}, {
    message: "Personal manager details are required when personal manager is selected",
    path: ["personalManagerName"],
}).refine((data) => {
    // If has agency management, agency details are required
    if (data.hasAgencyManagement) {
        return data.agencyName && data.agencyManagerName && data.agencyCity && data.agencyCountry && data.agencyEmail && data.agencyWhatsApp;
    }
    return true;
}, {
    message: "Agency details are required when agency management is selected",
    path: ["agencyName"],
});

type Screen2_3FormData = z.infer<typeof screen2_3Schema>;

interface Screen2_3Props {
    onNext: (data: Screen2_3FormData) => void;
    onBack: () => void;
    screen2_2Data?: any;
}

export default function Screen2_3({ onNext, onBack, screen2_2Data }: Screen2_3Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<Screen2_3FormData>({
        resolver: zodResolver(screen2_3Schema),
        defaultValues: {
            artistCategories: [],
            languages: [],
            yearsPerforming: "",
            starValue: "Rising Star",
            hasPersonalManager: false,
            personalManagerName: "",
            personalManagerCity: "",
            personalManagerCountry: "",
            personalManagerEmail: "",
            personalManagerWhatsApp: "",
            hasAgencyManagement: false,
            agencyName: "",
            agencyManagerName: "",
            agencyCity: "",
            agencyCountry: "",
            agencyEmail: "",
            agencyWhatsApp: "",
            quoteResponsibility: "I will Quote Myself",
        },
    });

    const watchedValues = watch();
    const hasPersonalManager = watchedValues.hasPersonalManager;
    const hasAgencyManagement = watchedValues.hasAgencyManagement;

    // Artist categories (Level 1 + Level 2)
    const artistCategories = [
        { id: "dance", label: "Dance", subcategories: ["Contemporary", "Classical", "Hip Hop", "Ballet", "Folk", "Bollywood"] },
        { id: "music", label: "Music", subcategories: ["Vocal", "Instrumental", "Classical", "Contemporary", "Folk", "Fusion"] },
        { id: "theatre", label: "Theatre", subcategories: ["Drama", "Comedy", "Musical", "Experimental", "Street Theatre"] },
        { id: "comedy", label: "Comedy", subcategories: ["Stand-up", "Sketch", "Improv", "Satire"] },
        { id: "magic", label: "Magic", subcategories: ["Close-up", "Stage", "Illusion", "Mentalism"] },
        { id: "circus", label: "Circus", subcategories: ["Acrobatics", "Juggling", "Aerial", "Clowning"] },
    ];

    // Language suggestions
    const languageSuggestions = [
        "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Gujarati",
        "Kannada", "Malayalam", "Punjabi", "Odia", "Assamese", "Sanskrit"
    ];

    const handleCategoryChange = (categoryId: string, checked: boolean) => {
        const currentCategories = watch("artistCategories");
        if (checked) {
            setValue("artistCategories", [...currentCategories, categoryId]);
        } else {
            setValue("artistCategories", currentCategories.filter(cat => cat !== categoryId));
        }
    };

    const handleLanguageAdd = (language: string) => {
        const currentLanguages = watch("languages");
        if (!currentLanguages.includes(language)) {
            setValue("languages", [...currentLanguages, language]);
        }
    };

    const handleLanguageRemove = (language: string) => {
        const currentLanguages = watch("languages");
        setValue("languages", currentLanguages.filter(lang => lang !== language));
    };

    const onSubmit = async (data: Screen2_3FormData) => {
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
                <p className="text-gray-600">Screen 2.3 - Contact & Management</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Artist Category Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold">Select Artist Category you belong to?</h2>
                        <span className="text-red-500">*</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Level 1 + Level 2 Dropdown of Artist Categories with Multiple Checkboxes
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {artistCategories.map((category) => (
                            <div key={category.id} className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={category.id}
                                        checked={watch("artistCategories").includes(category.id)}
                                        onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                                    />
                                    <Label htmlFor={category.id} className="font-medium">{category.label}</Label>
                                </div>
                                {watch("artistCategories").includes(category.id) && (
                                    <div className="ml-6 space-y-1">
                                        {category.subcategories.map((subcategory) => (
                                            <div key={subcategory} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`${category.id}-${subcategory}`}
                                                    checked={watch("artistCategories").includes(`${category.id}-${subcategory}`)}
                                                    onCheckedChange={(checked) => handleCategoryChange(`${category.id}-${subcategory}`, checked as boolean)}
                                                />
                                                <Label htmlFor={`${category.id}-${subcategory}`} className="text-sm">{subcategory}</Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {errors.artistCategories && (
                        <p className="text-red-500 text-sm">{errors.artistCategories.message}</p>
                    )}
                </div>

                {/* Languages Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold">Languages in which you perform on LIVE Stage?</h2>
                        <span className="text-red-500">*</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Autocomplete Feature required. No repeats.
                    </p>

                    <div>
                        <Label>Selected Languages</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {watch("languages").map((language) => (
                                <span
                                    key={language}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center space-x-1"
                                >
                                    <span>{language}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleLanguageRemove(language)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label>Add Language</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {languageSuggestions.map((language) => (
                                <button
                                    key={language}
                                    type="button"
                                    onClick={() => handleLanguageAdd(language)}
                                    disabled={watch("languages").includes(language)}
                                    className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {language}
                                </button>
                            ))}
                        </div>
                    </div>
                    {errors.languages && (
                        <p className="text-red-500 text-sm">{errors.languages.message}</p>
                    )}
                </div>

                {/* Years Performing */}
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="yearsPerforming">Years you have been performing on LIVE Stage?</Label>
                        <Input
                            id="yearsPerforming"
                            type="number"
                            placeholder="Enter number of years"
                            {...register("yearsPerforming")}
                        />
                        {errors.yearsPerforming && (
                            <p className="text-red-500 text-sm mt-1">{errors.yearsPerforming.message}</p>
                        )}
                    </div>
                </div>

                {/* Star Value Positioning */}
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="starValue">Where will you position your Star Value for LIVE Stage?</Label>
                        <Select
                            value={watch("starValue")}
                            onValueChange={(value) => setValue("starValue", value as any)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Global Legend">Global Legend</SelectItem>
                                <SelectItem value="Superstar">Superstar</SelectItem>
                                <SelectItem value="Top Performer">Top Performer</SelectItem>
                                <SelectItem value="Fan Favourite">Fan Favourite</SelectItem>
                                <SelectItem value="Rising Star">Rising Star</SelectItem>
                                <SelectItem value="Emerging Talent">Emerging Talent</SelectItem>
                                <SelectItem value="Underdog">Underdog</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.starValue && (
                            <p className="text-red-500 text-sm mt-1">{errors.starValue.message}</p>
                        )}
                    </div>
                </div>

                {/* Personal Manager Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="hasPersonalManager"
                            checked={hasPersonalManager}
                            onCheckedChange={(checked) => setValue("hasPersonalManager", checked as boolean)}
                        />
                        <Label htmlFor="hasPersonalManager" className="text-lg font-medium">
                            Do you have a Personal Manager?
                        </Label>
                    </div>
                    <p className="text-sm text-gray-600">
                        Skip next step if answer is 'No'
                    </p>

                    {hasPersonalManager && (
                        <div className="space-y-4 p-4 border rounded-lg">
                            <h3 className="font-semibold">Your Personal Manager Contact Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="personalManagerName">Manager Name</Label>
                                    <Input
                                        id="personalManagerName"
                                        placeholder="Enter manager name"
                                        {...register("personalManagerName")}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="personalManagerCity">City</Label>
                                    <Input
                                        id="personalManagerCity"
                                        placeholder="Enter city"
                                        {...register("personalManagerCity")}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="personalManagerCountry">Country</Label>
                                    <Input
                                        id="personalManagerCountry"
                                        placeholder="Enter country"
                                        {...register("personalManagerCountry")}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="personalManagerEmail">Email Address</Label>
                                    <Input
                                        id="personalManagerEmail"
                                        type="email"
                                        placeholder="Enter email (generic domain only)"
                                        {...register("personalManagerEmail")}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Email Address has to be Generic (No Custom Domain)</p>
                                </div>
                                <div>
                                    <Label htmlFor="personalManagerWhatsApp">WhatsApp Number</Label>
                                    <Input
                                        id="personalManagerWhatsApp"
                                        placeholder="Enter WhatsApp number"
                                        {...register("personalManagerWhatsApp")}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Agency Management Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="hasAgencyManagement"
                            checked={hasAgencyManagement}
                            onCheckedChange={(checked) => setValue("hasAgencyManagement", checked as boolean)}
                        />
                        <Label htmlFor="hasAgencyManagement" className="text-lg font-medium">
                            Are you represented / managed by an Artist Management Company?
                        </Label>
                    </div>
                    <p className="text-sm text-gray-600">
                        Skip next step if answer is 'No'
                    </p>

                    {hasAgencyManagement && (
                        <div className="space-y-4 p-4 border rounded-lg">
                            <h3 className="font-semibold">Your Agency Contact Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="agencyName">Agency Name</Label>
                                    <Input
                                        id="agencyName"
                                        placeholder="Enter agency name"
                                        {...register("agencyName")}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="agencyManagerName">Artist Manager Name</Label>
                                    <Input
                                        id="agencyManagerName"
                                        placeholder="Enter manager name"
                                        {...register("agencyManagerName")}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="agencyCity">City</Label>
                                    <Input
                                        id="agencyCity"
                                        placeholder="Enter city"
                                        {...register("agencyCity")}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="agencyCountry">Country</Label>
                                    <Input
                                        id="agencyCountry"
                                        placeholder="Enter country"
                                        {...register("agencyCountry")}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="agencyEmail">Email Address</Label>
                                    <Input
                                        id="agencyEmail"
                                        type="email"
                                        placeholder="Enter email (custom domain only)"
                                        {...register("agencyEmail")}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Email Address has to be of Custom Domain (no Gmail, Hotmail, Yahoo)</p>
                                </div>
                                <div>
                                    <Label htmlFor="agencyWhatsApp">WhatsApp Number</Label>
                                    <Input
                                        id="agencyWhatsApp"
                                        placeholder="Enter WhatsApp number"
                                        {...register("agencyWhatsApp")}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quote Responsibility */}
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="quoteResponsibility">Who will Quote for your Performances?</Label>
                        <Select
                            value={watch("quoteResponsibility")}
                            onValueChange={(value) => setValue("quoteResponsibility", value as any)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="I will Quote Myself">I will Quote Myself</SelectItem>
                                <SelectItem value="My Personal Manager will Quote">My Personal Manager will Quote</SelectItem>
                                <SelectItem value="My Artist Manager will Quote">My Artist Manager will Quote</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-gray-500 mt-1">
                            AAW Requests will hereby go to the one selected by the Artist.
                        </p>
                        {errors.quoteResponsibility && (
                            <p className="text-red-500 text-sm mt-1">{errors.quoteResponsibility.message}</p>
                        )}
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
                        Back to Screen 2.2
                    </Button>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1"
                    >
                        {isLoading ? "Processing..." : "Continue"}
                    </Button>
                </div>
            </form>
        </div>
    );
} 