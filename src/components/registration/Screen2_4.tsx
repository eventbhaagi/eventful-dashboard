"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "../ui/card";
import { CardHeaderSection } from "../ui/cardHeaderSection";
import { LabeledInputField } from "../ui/lableInputfield";

// Validation schema for Screen 2.4
const screen2_4Schema = z.object({
  motivationalTalk: z.string().optional(),
  motivationalTalkPrice: z.string().optional(),
  panelistRole: z.string().optional(),
  panelistRolePrice: z.string().optional(),
  soloDanceSet: z.string().optional(),
  soloDanceSetPrice: z.string().optional(),
  ensembleShow: z.string().optional(),
  ensembleShowPrice: z.string().optional(),
  arenaTheatrical: z.string().optional(),
  arenaTheatricalPrice: z.string().optional(),
  segmentHosting: z.string().optional(),
  segmentHostingPrice: z.string().optional(),
  fullShowAnchoring: z.string().optional(),
  fullShowAnchoringPrice: z.string().optional(),
  runwayWalk: z.string().optional(),
  runwayWalkPrice: z.string().optional(),
  voiceover: z.string().optional(),
  voiceoverPrice: z.string().optional(),
});

type Screen2_4FormData = z.infer<typeof screen2_4Schema>;

interface Screen2_4Props {
  onNext: (data: Screen2_4FormData) => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function Screen2_4({ onNext, onBack, onSkip }: Screen2_4Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch } =
    useForm<Screen2_4FormData>({
      resolver: zodResolver(screen2_4Schema),
      defaultValues: {
        motivationalTalk: "",
        motivationalTalkPrice: "",
        panelistRole: "",
        panelistRolePrice: "",
        soloDanceSet: "",
        soloDanceSetPrice: "",
        ensembleShow: "",
        ensembleShowPrice: "",
        arenaTheatrical: "",
        arenaTheatricalPrice: "",
        segmentHosting: "",
        segmentHostingPrice: "",
        fullShowAnchoring: "",
        fullShowAnchoringPrice: "",
        runwayWalk: "",
        runwayWalkPrice: "",
        voiceover: "",
        voiceoverPrice: "",
      },
    });

  const performanceTypes = [
    {
      key: "motivationalTalk",
      label: "Motivational Talk / Life Journey Session",
      duration: "15–30 mins",
      description: "Inspirational speaking and life story sharing",
    },
    {
      key: "panelistRole",
      label: "Panelist / Award Presenter / Jury Role",
      duration: "20–40 mins",
      description: "Expert panel participation and award ceremonies",
    },
    {
      key: "soloDanceSet",
      label: "Solo Dance Set (with Choreo & Dancers)",
      duration: "10–15 min",
      description: "Individual dance performance with supporting dancers",
    },
    {
      key: "ensembleShow",
      label: "Ensemble Show (Dance+Dialogue+Interaction)",
      duration: "30–60 min",
      description: "Group performance with multiple elements",
    },
    {
      key: "arenaTheatrical",
      label: "Arena Theatrical Extravaganza (Multi Actor)",
      duration: "120–180 min",
      description: "Large-scale theatrical production",
    },
    {
      key: "segmentHosting",
      label: "Segment Hosting / Spotlight Anchoring",
      duration: "20–30 min",
      description: "Hosting specific segments of events",
    },
    {
      key: "fullShowAnchoring",
      label: "Full Show Anchoring (Mainstage Host)",
      duration: "3–4 hrs",
      description: "Complete event hosting and management",
    },
    {
      key: "runwayWalk",
      label: "Runway Walk – Showstopper, Single Look",
      duration: "30-45 min",
      description: "Fashion show participation",
    },
    {
      key: "voiceover",
      label: "Voiceover / Show Narration / Background Hosting",
      duration: "2–4 hrs",
      description: "Voice work and narration services",
    },
  ];

  const onSubmit = async (data: Screen2_4FormData) => {
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
    <Card className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-white">
      <CardHeaderSection
        title="Performing Artist Registration"
        description="Performance Types & Pricing"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Performance Types Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-black">
              What types of performances do you offer?
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            Please provide your pricing for each performance type. Duration and
            pricing are required for each selected type.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {performanceTypes.map((type) => (
              <div key={type.key} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-black">{type.label}</h3>
                    <p className="text-sm text-gray-600">
                      Duration: {type.duration}
                    </p>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LabeledInputField
                    id={`${type.key}Duration`}
                    label="Duration (minutes)"
                    type="number"
                    placeholder="Enter duration in minutes"
                    register={register(type.key as keyof Screen2_4FormData)}
                    //   error={errors.yearsPerforming}
                    //   onBlur={(value) => fetchSocialData("Facebook", value)}
                  />
                  {/* <div>
                    <Label htmlFor={`${type.key}Duration`}>
                      Duration (minutes)
                    </Label>
                    <Input
                      id={`${type.key}Duration`}
                      type="number"
                      placeholder="Enter duration in minutes"
                      {...register(type.key as keyof Screen2_4FormData)}
                    />
                  </div> */}
                  <div>
                    <Label htmlFor={`${type.key}Price`} className="text-black">
                      Pricing
                    </Label>
                    <div className="flex space-x-2">
                      <Select
                        value={
                          watch(
                            `${type.key}Currency` as keyof Screen2_4FormData
                          ) || "INR"
                        }
                        onValueChange={(value) =>
                          setValue(
                            `${type.key}Currency` as keyof Screen2_4FormData,
                            value
                          )
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">₹</SelectItem>
                          <SelectItem value="USD">$</SelectItem>
                          <SelectItem value="EUR">€</SelectItem>
                          <SelectItem value="GBP">£</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id={`${type.key}Price`}
                        type="number"
                        placeholder="Enter price"
                        {...register(
                          `${type.key}Price` as keyof Screen2_4FormData
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            Back to Screen 2.3
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onSkip}
            className="flex-1"
          >
            Skip for Now
          </Button>

          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Processing..." : "Continue to Screen 2.5"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
