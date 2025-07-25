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
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "../ui/card";
import { CardHeaderSection } from "../ui/cardHeaderSection";
import { LabeledInputField } from "../ui/lableInputfield";

// Validation schema for Screen 1.2
const screen1_2Schema = z
  .object({
    instagramId: z.string().optional(),
    linkedinId: z.string().optional(),
    twitterId: z.string().optional(),
    facebookId: z.string().optional(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    isPerformingArtist: z.boolean(), // Remove .default(false) to make it required
  })
  .refine(
    (data) => {
      // At least one social network ID is required
      return (
        data.instagramId || data.linkedinId || data.twitterId || data.facebookId
      );
    },
    {
      message: "At least one social network ID is required",
      path: ["instagramId"], // This will show the error on the first social field
    }
  );

type Screen1_2FormData = z.infer<typeof screen1_2Schema>;

interface Screen1_2Props {
  onNext: (data: Screen1_2FormData) => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function Screen1_2({ onNext, onBack, onSkip }: Screen1_2Props) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Screen1_2FormData>({
    resolver: zodResolver(screen1_2Schema),
    defaultValues: {
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
    },
  });

  const watchedSocialIds = watch([
    "instagramId",
    "linkedinId",
    "twitterId",
    "facebookId",
  ]);
  const hasSocialId = watchedSocialIds.some((id) => id && id.trim() !== "");

  // Simulate fetching user data from social networks
  const fetchSocialData = async (platform: string, id: string) => {
    if (!id.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API call to fetch user data from social network
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - in real app, this would come from social network API
      const mockData = {
        firstName: "John",
        lastName: "Doe",
        gender: "male" as const,
        dateOfBirth: "1990-01-01",
        city: "Mumbai",
        country: "India",
      };

      // Auto-fill the form with fetched data
      setValue("firstName", mockData.firstName);
      setValue("lastName", mockData.lastName);
      setValue("gender", mockData.gender);
      setValue("dateOfBirth", mockData.dateOfBirth);
      setValue("city", mockData.city);
      setValue("country", mockData.country);
    } catch (error) {
      console.error(`Error fetching ${platform} data:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: Screen1_2FormData) => {
    setIsLoading(true);
    try {
      // Validate that at least one social network ID is provided
      if (!hasSocialId) {
        throw new Error("At least one social network ID is required");
      }

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
        title="User Registration"
        description="Personal Information"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Social Network IDs Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-black">
              Social Network IDs
            </h2>
            <span className="text-red-500">*</span>
          </div>
          <p className="text-sm text-gray-600">
            Any 1 Social Network ID is Mandatory. We will fetch the First Name,
            Last Name, Gender, DOB, Location, Profile Pic from these Social
            Network IDs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabeledInputField
              id="instagramId"
              label="Instagram ID"
              placeholder="Enter Instagram username"
              register={register("instagramId")}
              error={errors.instagramId}
              onBlur={(value: string) => fetchSocialData("Instagram", value)}
            />

            <LabeledInputField
              id="linkedinId"
              label="LinkedIn ID"
              placeholder="Enter LinkedIn profile URL or ID"
              register={register("linkedinId")}
              error={errors.linkedinId}
              onBlur={(value: string) => fetchSocialData("LinkedIn", value)}
            />

            <LabeledInputField
              id="twitterId"
              label="Twitter ID"
              placeholder="Enter Twitter username"
              register={register("twitterId")}
              error={errors.twitterId}
              onBlur={(value: string) => fetchSocialData("Twitter", value)}
            />
            <LabeledInputField
              id="facebookId"
              label="Facebook ID"
              placeholder="Enter Facebook profile URL or ID"
              register={register("facebookId")}
              error={errors.facebookId}
              onBlur={(value: string) => fetchSocialData("Facebook", value)}
            />
          </div>

          {!hasSocialId && (
            <p className="text-red-500 text-sm">
              At least one social network ID is required
            </p>
          )}
        </div>

        {/* Personal Information Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-black">
            Personal Information
          </h2>
          <p className="text-sm text-gray-600">
            Data Autofilled (as fetched from Social Networks, but Editable)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabeledInputField
              id="firstName"
              label="First Name"
              placeholder="Enter first name"
              register={register("firstName")}
              error={errors.firstName}
            //   onBlur={(value) => fetchSocialData("Facebook", value)}
            />
            {/* <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter first name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div> */}
 <LabeledInputField
              id="lastName"
              label="Last Name"
              placeholder="Enter last name"
              register={register("lastName")}
              error={errors.lastName}
            //   onBlur={(value) => fetchSocialData("Facebook", value)}
            />
            {/* <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter last name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div> */}
          </div>

          <div>
            <Label htmlFor="gender" className="text-black font-medium">Gender</Label>
            <Select
              value={watch("gender")}
              onValueChange={(value) =>
                setValue("gender", value as "male" | "female" | "other")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="dateOfBirth" className="text-black font-medium">Date of Birth</Label>
            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabeledInputField
              id="city"
              label="City"
              placeholder="Enter City"
              register={register("city")}
              error={errors.city}
            //   onBlur={(value) => fetchSocialData("Facebook", value)}
            />
            {/* <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter city" {...register("city")} />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div> */}

<LabeledInputField
              id="country"
              label="Country"
              placeholder="Enter Country"
              register={register("country")}
              error={errors.country}
            //   onBlur={(value) => fetchSocialData("Facebook", value)}
            />
            {/* <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Enter country"
                {...register("country")}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div> */}
          </div>
        </div>

        {/* Performing Artist Checkbox */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPerformingArtist"
              checked={watch("isPerformingArtist")}
              onCheckedChange={(checked) =>
                setValue("isPerformingArtist", checked as boolean)
              }
            />
            <Label htmlFor="isPerformingArtist" className="text-lg text-black font-medium">
              I&apos;m a Performing Artist
            </Label>
          </div>
          <p className="text-sm text-gray-600">
            Skip this section if checkbox isn&apos;t &apos;checked&apos;
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back to Screen 1.1
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
            disabled={isLoading || !hasSocialId}
            className="flex-1"
          >
            {isLoading ? "Processing..." : "Continue"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
