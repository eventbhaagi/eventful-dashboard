"use client";
import React from "react";
import OutlineCard from "@/app/components/shared/OutlineCard";
import Image from "next/image";
import { Button, Label, Select, TextInput } from "flowbite-react";

const GeneralTab = () => {
  return (
    <div className="space-y-6">
      {/* Profile Pic - Keep as is */}
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="md:col-span-6 col-span-12">
          <OutlineCard>
            <h5 className="card-title">Change Profile</h5>
            <p className="card-subtitle -mt-1">
              Change your profile picture from here
            </p>
            <div className="mx-auto text-center mt-5">
              <Image
                src="/images/profile/user-1.jpg"
                alt="logo"
                height="120"
                width="120"
                className="rounded-full mx-auto"
              />
              <div className="flex justify-center gap-3 py-6">
                <Button className="bg-[#6A5CFF] hover:bg-[#5848f5] text-white font-medium text-sm px-6 py-2 rounded-xl shadow-md transition duration-200">
                  Upload
                </Button>
                <Button className="bg-[#FFD6DC] hover:bg-[#ffc6d0] text-[#FF5A7A] font-medium text-sm px-6 py-2 rounded-xl shadow-md transition duration-200">
                  Reset
                </Button>
              </div>
              <p className="text-sm text-bodytext">
                Allowed JPG, GIF or PNG. Max size of 800K
              </p>
            </div>
          </OutlineCard>
        </div>

        <div className="md:col-span-6 col-span-12">
          <OutlineCard>
            <h5 className="card-title">Change Password</h5>
            <p className="card-subtitle -mt-1">
              To change your password please confirm here
            </p>
            <div className="flex flex-col gap-3 mt-3">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cpwd">Current Password</Label>
                </div>
                <TextInput id="cpwd" type="password" sizing="md" />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="npwd">New Password</Label>
                </div>
                <TextInput id="npwd" type="password" sizing="md" />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cfpwd">Confirm Password</Label>
                </div>
                <TextInput id="cfpwd" type="password" sizing="md" />
              </div>
            </div>
          </OutlineCard>
        </div>
      </div>

      {/* Contact Info */}
      <OutlineCard>
        <h5 className="card-title">Contact Verification</h5>
        <p className="card-subtitle -mt-1">Verify your mobile and email IDs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="md:col-span-1">
            <Label htmlFor="wa">WhatsApp Number*</Label>
            <div className="flex gap-2 mt-1">
              <Select id="wa-country" className="w-2/5">
                <option value="">Select</option>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
              </Select>
              <TextInput id="wa" type="text" className="w-3/5" />
            </div>
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="wa-otp">WhatsApp OTP</Label>
            <TextInput id="wa-otp" type="text" className="mt-1" />
          </div>

          <div className="md:col-span-1">
            <Label htmlFor="company-email">Company Email Address*</Label>
            <TextInput id="company-email" type="email" className="mt-1" />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="company-otp">Company Email OTP</Label>
            <TextInput id="company-otp" type="text" className="mt-1" />
          </div>

          <div className="md:col-span-1">
            <Label htmlFor="personal-email">Personal Email Address*</Label>
            <TextInput id="personal-email" type="email" className="mt-1" />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="personal-otp">Personal Email OTP</Label>
            <TextInput id="personal-otp" type="text" className="mt-1" />
          </div>
        </div>
      </OutlineCard>

      {/* Social Links */}
      <OutlineCard>
        <h5 className="card-title">Social Profiles</h5>
        <p className="card-subtitle -mt-1">Link your social media accounts</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label htmlFor="insta">Instagram ID</Label>
            <TextInput id="insta" type="text" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn ID</Label>
            <TextInput id="linkedin" type="text" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter ID</Label>
            <TextInput id="twitter" type="text" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="fb">Facebook ID</Label>
            <TextInput id="fb" type="text" className="mt-1" />
          </div>
        </div>
      </OutlineCard>

      {/* Personal Details */}
      <OutlineCard>
        <h5 className="card-title">Personal Details</h5>
        <p className="card-subtitle -mt-1">Basic information about you</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="md:col-span-1">
            <Label htmlFor="fname">Your Name</Label>
            <div className="flex gap-2 mt-1">
              <TextInput
                id="fname"
                type="text"
                placeholder="First"
                className="w-1/2"
              />
              <TextInput
                id="lname"
                type="text"
                placeholder="Last"
                className="w-1/2"
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="gender">Your Gender</Label>
            <Select id="gender" defaultValue="" className="mt-1">
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>
          </div>

          <div className="md:col-span-1">
            <Label htmlFor="dob">Your Date of Birth</Label>
            <TextInput id="dob" type="date" className="mt-1" />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="location">Your Base Location</Label>
            <div className="flex gap-2 mt-1">
              <TextInput
                id="city"
                type="text"
                placeholder="City"
                className="w-1/2"
              />
              <TextInput
                id="country"
                type="text"
                placeholder="Country"
                className="w-1/2"
              />
            </div>
          </div>
        </div>
      </OutlineCard>

      {/* Save/Cancel */}
      <div className="flex justify-end gap-3 pt-6">
        <Button className="bg-[#6A5CFF] hover:bg-[#5848f5] text-white font-medium text-sm px-6 py-2 rounded-xl shadow-md transition duration-200">
          Save
        </Button>
        <Button className="bg-[#FFD6DC] hover:bg-[#ffc6d0] text-[#FF5A7A] font-medium text-sm px-6 py-2 rounded-xl shadow-md transition duration-200">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default GeneralTab;
