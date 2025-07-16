"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Card } from "../ui/card";
import { CardHeaderSection } from "../ui/cardHeaderSection";
import { LabeledInputField } from "../ui/lableInputfield";

// Validation schema for Screen 2.1
const screen2_1Schema = z
  .object({
    youtubeChannelId: z.string().optional(),
    imdbProfileId: z.string().optional(),
    spotifyChannelId: z.string().optional(),
    soundcloudChannelId: z.string().optional(),
    appleMusicId: z.string().optional(),
    amazonMusicId: z.string().optional(),
    gaanaId: z.string().optional(),
    jioSaavnId: z.string().optional(),
    instagramId: z.string().optional(),
    facebookId: z.string().optional(),
  })
  .refine(
    (data) => {
      // At least 2 channels are required
      const filledChannels = Object.values(data).filter(
        (value) => value && value.trim() !== ""
      ).length;
      return filledChannels >= 2;
    },
    {
      message: "At least 2 social media channels are required",
      path: ["youtubeChannelId"],
    }
  );

type Screen2_1FormData = z.infer<typeof screen2_1Schema>;

interface Screen2_1Props {
  onNext: (data: Screen2_1FormData) => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function Screen2_1({ onNext, onBack, onSkip }: Screen2_1Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [validationResults, setValidationResults] = useState<
    Record<string, boolean>
  >({});

  const { register, handleSubmit, watch } = useForm<Screen2_1FormData>({
    resolver: zodResolver(screen2_1Schema),
    defaultValues: {
      youtubeChannelId: "",
      imdbProfileId: "",
      spotifyChannelId: "",
      soundcloudChannelId: "",
      appleMusicId: "",
      amazonMusicId: "",
      gaanaId: "",
      jioSaavnId: "",
      instagramId: "",
      facebookId: "",
    },
  });

  const watchedValues = watch();
  const filledChannels = Object.values(watchedValues).filter(
    (value) => value && value.trim() !== ""
  ).length;

  // Validate URL format for each platform
  const validateUrl = async (platform: string, url: string) => {
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API call for URL validation
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Basic URL validation (in real app, this would call platform-specific APIs)
      const isValid =
        url.includes(platform.toLowerCase()) || url.includes("http");
      setValidationResults((prev) => ({ ...prev, [platform]: isValid }));
    } catch (error) {
      console.error(`Error validating ${platform} URL:`, error);
      setValidationResults((prev) => ({ ...prev, [platform]: false }));
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: Screen2_1FormData) => {
    setIsLoading(true);
    try {
      // Validate that at least 2 channels are provided
      if (filledChannels < 2) {
        throw new Error("At least 2 social media channels are required");
      }

      onNext(data);
    } catch (error) {
      console.error("Validation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const socialPlatforms = [
    {
      key: "youtubeChannelId",
      label: "YouTube Channel ID",
      placeholder: "Enter YouTube channel URL or ID",
    },
    {
      key: "imdbProfileId",
      label: "IMDB Profile ID",
      placeholder: "Enter IMDB profile URL or ID",
    },
    {
      key: "spotifyChannelId",
      label: "Spotify Channel ID",
      placeholder: "Enter Spotify artist URL or ID",
    },
    {
      key: "soundcloudChannelId",
      label: "SoundCloud Channel ID",
      placeholder: "Enter SoundCloud profile URL or ID",
    },
    {
      key: "appleMusicId",
      label: "Apple Music ID",
      placeholder: "Enter Apple Music artist URL or ID",
    },
    {
      key: "amazonMusicId",
      label: "Amazon Music ID",
      placeholder: "Enter Amazon Music artist URL or ID",
    },
    {
      key: "gaanaId",
      label: "Gaana ID",
      placeholder: "Enter Gaana artist URL or ID",
    },
    {
      key: "jioSaavnId",
      label: "JioSaavn ID",
      placeholder: "Enter JioSaavn artist URL or ID",
    },
    {
      key: "instagramId",
      label: "Instagram ID",
      placeholder: "Enter Instagram profile URL or username",
    },
    {
      key: "facebookId",
      label: "Facebook ID",
      placeholder: "Enter Facebook page URL or ID",
    },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 space-y-8 bg-white">
      <CardHeaderSection
        title="Performing Artist Registration"
        description="Social Media Channels"
      />
      {/* <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Performing Artist Registration</h1>
        <p className="text-gray-600">Screen 2.1 - Social Media Channels</p>
      </div> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Social Media Channels Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-black">
              Help us with your Social Media Channels
            </h2>
            <span className="text-red-500">*</span>
          </div>
          <p className="text-sm text-gray-600">
            Any 2 Channels are Compulsary. RealTime validation if the URL is
            valid.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialPlatforms.map((platform) => (
              <LabeledInputField
                key={platform.key}
                id={platform.key}
                label={platform.label}
                placeholder={platform.placeholder}
                register={register(platform.key as keyof Screen2_1FormData)}
                validationResult={validationResults[platform.key]}
                onBlur={validateUrl}
              />
            ))}
          </div>

          <div className="flex items-center justify-between p-4 bg-black rounded-lg">
            <span className="text-sm font-medium">
              Channels filled: {filledChannels}/2
            </span>
            {filledChannels < 2 && (
              <span className="text-red-500 text-sm">
                At least 2 channels are required
              </span>
            )}
            {filledChannels >= 2 && (
              <span className="text-green-500 text-sm">
                ✓ Minimum requirement met
              </span>
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
            Back to Screen 1.2
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
            {isLoading ? "Processing..." : "Continue to Screen 2.2"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
