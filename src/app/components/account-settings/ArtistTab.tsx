"use client";
import React from "react";
import OutlineCard from "@/app/components/shared/OutlineCard";
import { Button, Label, Select, TextInput, Textarea, FileInput, Radio } from "flowbite-react";

const ArtistTab = () => {
  return (
    <div className="space-y-6">

      {/* Social Media Channels */}
      <OutlineCard>
        <h5 className="card-title">Social Media Channels</h5>
        <p className="card-subtitle -mt-1">Help us with your official handles</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {["YouTube Channel ID", "IMDB Profile ID", "Spotify Channel ID", "SoundCloud Channel ID", "Apple Music ID", "Amazon Music ID", "Gaana ID", "JioSaavn ID", "Instagram ID", "Facebook ID"].map((label, i) => (
            <div key={i}>
              <Label>{label}</Label>
              <TextInput type="text" className="mt-1" />
            </div>
          ))}
        </div>
      </OutlineCard>

      {/* Artist Identity */}
      <OutlineCard>
        <h5 className="card-title">Your Identity</h5>
        <p className="card-subtitle -mt-1">Help us confirm we’ve identified you right</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label>Your Screen Name</Label>
            <TextInput type="text" />
          </div>
          <div>
            <Label>Profile Picture</Label>
            <FileInput />
          </div>
          <div className="md:col-span-2">
            <Label>Profile Bio</Label>
            <Textarea rows={4} />
          </div>
          <div className="md:col-span-2">
            <Label>Anything else fetched by scrapers</Label>
            <Textarea rows={2} />
          </div>
        </div>
      </OutlineCard>

      {/* Contact Info */}
      <OutlineCard>
        <h5 className="card-title">Your Point of Contact</h5>
        <p className="card-subtitle -mt-1">Who should we talk to?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="md:col-span-2">
            <Label>Select Artist Category</Label>
            <Select multiple>
              <option>Musician</option>
              <option>Actor</option>
              <option>Dancer</option>
            </Select>
          </div>
          <div className="md:col-span-1">
            <Label>Languages You Perform In</Label>
            <TextInput type="text" placeholder="Tag format" />
          </div>
          <div>
            <Label>Years of Experience</Label>
            <TextInput type="text" />
          </div>
          <div>
            <Label>Star Value on LIVE Stage</Label>
            <Select>
              <option>Select</option>
              <option>Top Star</option>
              <option>Rising Talent</option>
            </Select>
          </div>
          <div>
            <Label>Do you have a Personal Manager?</Label>
            <div className="flex gap-4 mt-2">
              <Radio name="manager" id="managerYes" /> <Label htmlFor="managerYes">Yes</Label>
              <Radio name="manager" id="managerNo" /> <Label htmlFor="managerNo">No</Label>
            </div>
          </div>
          <div>
            <Label>Manager Contact (if Yes)</Label>
            <TextInput type="text" />
          </div>
          <div>
            <Label>Represented by Management Company?</Label>
            <div className="flex gap-4 mt-2">
              <Radio name="agency" id="agencyYes" /> <Label htmlFor="agencyYes">Yes</Label>
              <Radio name="agency" id="agencyNo" /> <Label htmlFor="agencyNo">No</Label>
            </div>
          </div>
          <div>
            <Label>Agency Contact (if Yes)</Label>
            <TextInput type="text" />
          </div>
          <div className="md:col-span-2">
            <Label>Who Will Quote for Performances?</Label>
            <Select>
              <option>Select</option>
              <option>You</option>
              <option>Manager</option>
              <option>Agency</option>
            </Select>
          </div>
        </div>
      </OutlineCard>

      {/* Fee Expectations */}
      <OutlineCard>
        <h5 className="card-title">Fee Expectations</h5>
        <p className="card-subtitle -mt-1">Tell us your expected range</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {["Motivational Talk", "Panelist / Award Presenter", "Solo Dance Set", "Ensemble Show", "Arena Theatrical", "Segment Hosting", "Full Show Anchoring", "Runway Walk", "Voiceover"].map((item, idx) => (
            <div key={idx}>
              <Label>{item}</Label>
              <TextInput type="text" placeholder="INR or USD" />
            </div>
          ))}
        </div>
      </OutlineCard>

      {/* Standard Acts */}
      <OutlineCard>
        <h5 className="card-title">Standard Acts</h5>
        <p className="card-subtitle -mt-1">Got something ready?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="md:col-span-2">
            <Label>Act Title</Label>
            <TextInput type="text" />
          </div>
          <div>
            <Label>Act Pricing</Label>
            <TextInput type="text" />
          </div>
          <div className="md:col-span-2">
            <Label>Min. Stage Size</Label>
            <div className="flex gap-2">
              <TextInput placeholder="Width" />
              <TextInput placeholder="Depth" />
              <TextInput placeholder="Height" />
            </div>
          </div>
          <div>
            <Label>Act Duration</Label>
            <TextInput placeholder="in minutes" />
          </div>
          <div>
            <Label>Duration Unit</Label>
            <Select>
              <option>Minutes</option>
              <option>Hours</option>
            </Select>
          </div>
          <div>
            <Label>OnStage Crew Size</Label>
            <TextInput />
          </div>
          <div>
            <Label>BackStage Crew Size</Label>
            <TextInput />
          </div>
          <div>
            <Label>FOH Crew Size</Label>
            <TextInput />
          </div>
          <div>
            <Label>Reference Video URL</Label>
            <TextInput />
          </div>
          <div>
            <Label>Reference Photos</Label>
            <FileInput />
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button>Add More Acts</Button>
        </div>
      </OutlineCard>

      {/* Event Types Pricing */}
      <OutlineCard>
        <h5 className="card-title">Types of Events</h5>
        <p className="card-subtitle -mt-1">Events you perform & premium</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {["Public Concerts & Ticketed Shows", "Weddings & Private Social Events", "Corporate Events & Brand Launches", "Government Events & Tourism Festivals", "College Fest & Youth Events", "Fundraisers & Charity Events", "Award Ceremonies & Televised Events", "Devotional & Spiritual Events", "International Tours & Events", "HORECA & Lounge Gigs"].map((label, idx) => (
            <div key={idx}>
              <Label>{label}</Label>
              <TextInput type="text" placeholder="Fee" />
            </div>
          ))}
        </div>
      </OutlineCard>

      {/* Final Questions */}
      <OutlineCard>
        <h5 className="card-title">Last Few Questions</h5>
        <p className="card-subtitle -mt-1">Optional but helpful</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label>Open to Travel for LIVE?</Label>
            <Select>
              <option>Select</option>
              <option>Yes</option>
              <option>No</option>
            </Select>
          </div>
          <div>
            <Label>Countries Performed</Label>
            <TextInput placeholder="Comma or Tag separated" />
          </div>
          {["Revenue Share Collabs", "Artist Collaborations", "Merchandising Interest", "Auto-Quote Contract", "No Client Charge for Rehearsals", "No Charge for MUA", "No Charge for Event Social"].map((q, i) => (
            <div key={i}>
              <Label>{q}</Label>
              <div className="flex gap-4 mt-2">
                <Radio name={`q-${i}`} id={`q-${i}-yes`} /> <Label htmlFor={`q-${i}-yes`}>Yes</Label>
                <Radio name={`q-${i}`} id={`q-${i}-no`} /> <Label htmlFor={`q-${i}-no`}>No</Label>
              </div>
            </div>
          ))}
          <div>
            <Label>Upload Tech Rider</Label>
            <FileInput />
          </div>
          <div>
            <Label>Upload Hospitality Rider</Label>
            <FileInput />
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

export default ArtistTab;
