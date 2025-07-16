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

// Validation schema for Screen 2.6
const screen2_6Schema = z.object({
  publicConcerts: z.boolean(),
  publicConcertsPercentage: z.string().optional(),
  publicConcertsType: z.enum(["premium", "discount"]).optional(),

  weddings: z.boolean(),
  weddingsPercentage: z.string().optional(),
  weddingsType: z.enum(["premium", "discount"]).optional(),

  corporateEvents: z.boolean(),
  corporateEventsPercentage: z.string().optional(),
  corporateEventsType: z.enum(["premium", "discount"]).optional(),

  governmentEvents: z.boolean(),
  governmentEventsPercentage: z.string().optional(),
  governmentEventsType: z.enum(["premium", "discount"]).optional(),

  collegeFest: z.boolean(),
  collegeFestPercentage: z.string().optional(),
  collegeFestType: z.enum(["premium", "discount"]).optional(),

  fundraisers: z.boolean(),
  fundraisersPercentage: z.string().optional(),
  fundraisersType: z.enum(["premium", "discount"]).optional(),

  awardCeremonies: z.boolean(),
  awardCeremoniesPercentage: z.string().optional(),
  awardCeremoniesType: z.enum(["premium", "discount"]).optional(),

  devotionalEvents: z.boolean(),
  devotionalEventsPercentage: z.string().optional(),
  devotionalEventsType: z.enum(["premium", "discount"]).optional(),

  internationalTours: z.boolean(),
  internationalToursPercentage: z.string().optional(),
  internationalToursType: z.enum(["premium", "discount"]).optional(),

  horecaGigs: z.boolean(),
  horecaGigsPercentage: z.string().optional(),
  horecaGigsType: z.enum(["premium", "discount"]).optional(),
});

type Screen2_6FormData = z.infer<typeof screen2_6Schema>;

interface Screen2_6Props {
  onNext: (data: Screen2_6FormData) => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function Screen2_6({ onNext, onBack, onSkip }: Screen2_6Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch } =
    useForm<Screen2_6FormData>({
      resolver: zodResolver(screen2_6Schema),
      defaultValues: {
        publicConcerts: false,
        publicConcertsPercentage: "",
        publicConcertsType: "premium",
        weddings: false,
        weddingsPercentage: "",
        weddingsType: "premium",
        corporateEvents: false,
        corporateEventsPercentage: "",
        corporateEventsType: "premium",
        governmentEvents: false,
        governmentEventsPercentage: "",
        governmentEventsType: "premium",
        collegeFest: false,
        collegeFestPercentage: "",
        collegeFestType: "premium",
        fundraisers: false,
        fundraisersPercentage: "",
        fundraisersType: "premium",
        awardCeremonies: false,
        awardCeremoniesPercentage: "",
        awardCeremoniesType: "premium",
        devotionalEvents: false,
        devotionalEventsPercentage: "",
        devotionalEventsType: "premium",
        internationalTours: false,
        internationalToursPercentage: "",
        internationalToursType: "premium",
        horecaGigs: false,
        horecaGigsPercentage: "",
        horecaGigsType: "premium",
      },
    });

  const eventTypes = [
    {
      key: "publicConcerts",
      label: "Public Concerts & Ticketed Shows",
      description: "Large public performances and ticketed events",
    },
    {
      key: "weddings",
      label: "Weddings & Private Social Events",
      description: "Private celebrations and social gatherings",
    },
    {
      key: "corporateEvents",
      label: "Corporate Events & Brand Launches",
      description: "Business events and product launches",
    },
    {
      key: "governmentEvents",
      label: "Government Events & Tourism Festivals",
      description: "Official government functions and tourism events",
    },
    {
      key: "collegeFest",
      label: "College Fest & Youth Events",
      description: "Educational institution events and youth gatherings",
    },
    {
      key: "fundraisers",
      label: "Fundraisers & Charity Events",
      description: "Charitable events and fundraising activities",
    },
    {
      key: "awardCeremonies",
      label: "Award Ceremonies & Televised Events",
      description: "Award shows and broadcast events",
    },
    {
      key: "devotionalEvents",
      label: "Devotional & Spiritual Events",
      description: "Religious and spiritual gatherings",
    },
    {
      key: "internationalTours",
      label: "International Tours & Events",
      description: "Overseas performances and international events",
    },
    {
      key: "horecaGigs",
      label: "HORECA & Lounge Gigs",
      description: "Hotel, restaurant, and café performances",
    },
  ];

  const onSubmit = async (data: Screen2_6FormData) => {
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
        description="Event Type Pricing"
      />
   

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Event Type Pricing Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-black">
              Event Type Pricing Adjustments
            </h2>
          </div>
          <p className="text-sm text-black">
            System will auto-calculate premium on standard pricing, depending on
            Event Type & Performance Type. Select the event types you perform at
            and specify pricing adjustments.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {eventTypes.map((eventType) => {
              const isSelected = watch(
                eventType.key as keyof Screen2_6FormData
              );
              const percentageKey =
                `${eventType.key}Percentage` as keyof Screen2_6FormData;
              const typeKey = `${eventType.key}Type` as keyof Screen2_6FormData;

              return (
                <div
                  key={eventType.key}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-black">{eventType.label}</h3>
                      <p className="text-sm text-black">
                        {eventType.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={eventType.key}
                        checked={isSelected as boolean}
                        onChange={(e) =>
                          setValue(
                            eventType.key as keyof Screen2_6FormData,
                            e.target.checked
                          )
                        }
                        className="h-4 w-4"
                      />
                      <Label htmlFor={eventType.key} className="text-sm text-black">
                        Perform at this event type
                      </Label>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`${eventType.key}Type`} className="text-black">
                          Adjustment Type
                        </Label>
                        <Select
                          value={
                            typeof watch(typeKey) === "string"
                              ? (watch(typeKey) as string)
                              : "premium"
                          }
                          onValueChange={(value) =>
                            setValue(typeKey, value as "premium" | "discount")
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="premium">+ Premium</SelectItem>
                            <SelectItem value="discount">- Discount</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`${eventType.key}Percentage`} className="text-black">
                          Percentage
                        </Label>
                        <Input
                          id={`${eventType.key}Percentage`}
                          type="number"
                          placeholder="Enter percentage"
                          {...register(percentageKey)}
                        />
                      </div>
                      <div className="flex items-end">
                        <p className="text-sm text-gray-600">
                          {watch(typeKey) === "premium" ? "+" : "-"}
                          {watch(percentageKey) || "0"}% on standard pricing
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
            Back to Screen 2.5
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
            {isLoading ? "Processing..." : "Continue to Screen 2.7"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
