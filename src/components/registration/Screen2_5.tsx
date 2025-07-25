"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "../ui/card";
import { CardHeaderSection } from "../ui/cardHeaderSection";
import { LabeledInputField } from "../ui/lableInputfield";

// Validation schema for Screen 2.5
const screen2_5Schema = z.object({
  actTitle: z.string().min(1, "Act title is required"),
  actPricing: z.string().min(1, "Act pricing is required"),
  stageLength: z.string().optional(),
  stageDepth: z.string().optional(),
  stageHeight: z.string().optional(),
  ceilingHeight: z.string().optional(),
  actDuration: z.string().min(1, "Act duration is required"),
  durationUnit: z.enum(["minutes", "hours", "days"]),
  onStageCrewSize: z.string().optional(),
  backStageCrewSize: z.string().optional(),
  fohCrewSize: z.string().optional(),
  actReferenceVideoURL: z.string().url("Must be a valid URL").optional(),
  actReferencePhotos: z.string().optional(),
});

type Screen2_5FormData = z.infer<typeof screen2_5Schema>;

interface Screen2_5Props {
  onNext: (data: Screen2_5FormData) => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function Screen2_5({ onNext, onBack, onSkip }: Screen2_5Props) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Screen2_5FormData>({
    resolver: zodResolver(screen2_5Schema),
    defaultValues: {
      actTitle: "",
      actPricing: "",
      stageLength: "",
      stageDepth: "",
      stageHeight: "",
      ceilingHeight: "",
      actDuration: "",
      durationUnit: "minutes",
      onStageCrewSize: "",
      backStageCrewSize: "",
      fohCrewSize: "",
      actReferenceVideoURL: "",
      actReferencePhotos: "",
    },
  });

  const onSubmit = async (data: Screen2_5FormData) => {
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
    <Card className="w-full max-w-2xl mx-auto p-6 space-y-8 bg-white">
      <CardHeaderSection
        title="Performing Artist Registration"
        description="Act Details"
      />
      {/* <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Performing Artist Registration</h1>
                <p className="text-gray-600">Screen 2.5 - Act Details</p>
            </div> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Act Information Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-black">+ Act 1</h2>
          </div>
          <p className="text-sm text-gray-600">
            Please provide details about your main act or performance.
          </p>

          <div className="space-y-4">
            <LabeledInputField
              id="actTitle"
              label="Act Title"
              placeholder="Name of Act / Production"
              register={register("actTitle")}
              error={errors.actTitle}
              //   onBlur={(value) => fetchSocialData("Facebook", value)}
            />
            {/* <div>
                            <Label htmlFor="actTitle">Act Title</Label>
                            <Input
                                id="actTitle"
                                placeholder="Name of Act / Production"
                                {...register("actTitle")}
                            />
                            {errors.actTitle && (
                                <p className="text-red-500 text-sm mt-1">{errors.actTitle.message}</p>
                            )}
                        </div> */}
            <LabeledInputField
              id="actPricing"
              label="Act Pricing"
              placeholder="Currency - Value"
              register={register("actPricing")}
              error={errors.actPricing}
              //   onBlur={(value) => fetchSocialData("Facebook", value)}
            />
            {/* <div>
                            <Label htmlFor="actPricing">Act Pricing</Label>
                            <Input
                                id="actPricing"
                                placeholder="Currency - Value"
                                {...register("actPricing")}
                            />
                            {errors.actPricing && (
                                <p className="text-red-500 text-sm mt-1">{errors.actPricing.message}</p>
                            )}
                        </div> */}

            {/* Stage Size Requirements */}
            <div className="space-y-4">
              <h3 className="font-semibold text-black">
                Minimum Stage Size Requirements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <LabeledInputField
                  id="stageLength"
                  label="Stage Length"
                  placeholder="Length in feet/meters"
                  register={register("stageLength")}
                />
                <LabeledInputField
                  id="stageDepth"
                  label="Stage Depth"
                  placeholder="Depth in feet/meters"
                  register={register("stageDepth")}
                />
                {/* <div>
                  <Label htmlFor="stageDepth">Stage Depth</Label>
                  <Input
                    id="stageDepth"
                    placeholder="Depth in feet/meters"
                    {...register("stageDepth")}
                  />
                </div> */}
                <LabeledInputField
                  id="stageHeight"
                  label="Stage Height"
                  placeholder="Height in feet/meters"
                  register={register("stageHeight")}
                />
                {/* <div>
                  <Label htmlFor="stageHeight">Stage Height</Label>
                  <Input
                    id="stageHeight"
                    placeholder="Height in feet/meters"
                    {...register("stageHeight")}
                  />
                </div> */}
                <LabeledInputField
                  id="ceilingHeight"
                  label="Ceiling Height"
                  placeholder="Ceiling height in feet/meters"
                  register={register("ceilingHeight")}
                />
                {/* <div>
                  <Label htmlFor="ceilingHeight">Ceiling Height</Label>
                  <Input
                    id="ceilingHeight"
                    placeholder="Ceiling height in feet/meters"
                    {...register("ceilingHeight")}
                  />
                </div> */}
              </div>
            </div>

            {/* Act Duration */}
            <div className="grid grid-cols-2 gap-4">
              <LabeledInputField
                id="actDuration"
                label="Act Duration"
                type="number"
                placeholder="Duration"
                register={register("actDuration")}
                error={errors.actDuration}
              />
              {/* <div>
                <Label htmlFor="actDuration">Act Duration</Label>
                <Input
                  id="actDuration"
                  type="number"
                  placeholder="Duration"
                  {...register("actDuration")}
                />
                {errors.actDuration && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.actDuration.message}
                  </p>
                )}
              </div> */}

              <div>
                <Label
                  htmlFor="durationUnit"
                  className="text-black font-medium"
                >
                  Duration Unit
                </Label>
                <Select
                  value={watch("durationUnit")}
                  onValueChange={(value) =>
                    setValue(
                      "durationUnit",
                      value as "minutes" | "hours" | "days"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Crew Size Requirements */}
            <div className="space-y-4">
              <h3 className="font-semibold text-black">
                Crew Size Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <LabeledInputField
                  id="actDuration"
                  label="On-Stage Crew Size"
                  placeholder="No. of travelling crew performing on stage"
                  register={register("actDuration")}
                />
                {/* <Label htmlFor="onStageCrewSize">On-Stage Crew Size</Label>
                  <Input
                    id="onStageCrewSize"
                    placeholder="No. of travelling crew performing on stage"
                    {...register("onStageCrewSize")}
                  /> */}

                <LabeledInputField
                  id="backStageCrewSize"
                  label="Backstage Crew Size"
                  placeholder="No. of travelling crew handling backstage"
                  register={register("backStageCrewSize")}
                />
                {/* <div>
                  <Label htmlFor="backStageCrewSize">Backstage Crew Size</Label>
                  <Input
                    id="backStageCrewSize"
                    placeholder="No. of travelling crew handling backstage"
                    {...register("backStageCrewSize")}
                  />
                </div> */}
                <LabeledInputField
                  id="fohCrewSize"
                  label="FOH Crew Size"
                  placeholder="No. of travelling crew handling FOH/Console"
                  register={register("fohCrewSize")}
                />
                {/* <div>
                  <Label htmlFor="fohCrewSize">FOH Crew Size</Label>
                  <Input
                    id="fohCrewSize"
                    placeholder="No. of travelling crew handling FOH/Console"
                    {...register("fohCrewSize")}
                  />
                </div> */}
              </div>
            </div>

            {/* Reference Materials */}
            <div className="space-y-4">
              <h3 className="font-semibold text-black">Reference Materials</h3>
             
              <div>
              <LabeledInputField
                id="actReferenceVideoURL"
                label=" Act Reference Video URL"
                type="url"
                placeholder="URL of the Act Video (public link)"
                register={register("actReferenceVideoURL")}
                error={errors.actReferenceVideoURL}
              />
                {/* <Label htmlFor="actReferenceVideoURL">
                  Act Reference Video URL
                </Label>
                <Input
                  id="actReferenceVideoURL"
                  type="url"
                  placeholder="URL of the Act Video (public link)"
                  {...register("actReferenceVideoURL")}
                /> */}
                <p className="text-sm text-gray-500 mt-1">
                  Should be a public link
                </p>
              </div>
              <div>
                <Label htmlFor="actReferencePhotos" className="text-black font-medium">Act Reference Photos</Label>
                <Textarea
                  id="actReferencePhotos"
                  placeholder="Photo 1, Photo 2, ---- Photo 20 (Max 20 photographs of the Act)"
                  rows={3}
                  {...register("actReferencePhotos")}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Max 20 photographs of the Act
                </p>
              </div>
            </div>
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
            Back to Screen 2.4
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
            {isLoading ? "Processing..." : "Continue to Screen 2.6"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
