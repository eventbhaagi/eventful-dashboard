"use client";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { LabeledInputField } from "../ui/lableInputfield";
import { RadioGroup, RadioGroupItem } from "../ui/radiobutton";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calender";
const venuCategory = [
  { label: "Hotel", value: "hotel" },
  { label: "Convention Center", value: "convention_center" },
];

const stageTypes = [
  {
    label: "Non-Recorded",
    value: "non-recorded",
  },
  {
    label: "Live Streamed",
    value: "live-streamed",
  },
  {
    label: "Televised",
    value: "televised",
  },
];
const platformsTypes = [
  {
    label: "BookMyShow",
    value: "bookmyshow",
  },
  {
    label: "Zomato",
    value: "zomato",
  },
  {
    label: "PayTM Insider",
    value: "paytm-insider",
  },
  {
    label: "Ticketmaster",
    value: "ticketmaster",
  },
];
export default function CreateEvent_2() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 6, 1),
    to: new Date(2025, 6, 18),
  });

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 shadow-2xl bg-white space-y-8">
      <h1 className="text-center text-black text-4xl font-extrabold">
        Create Event
      </h1>
      <div className="flex flex-col gap-y-6">
        <div className="space-y-2 ">
          <p className="text-base font-medium text-black">
            Is this online Event only
          </p>
          <RadioGroup defaultValue="public" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="text-black">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="text-black">
                No
              </Label>
            </div>
          </RadioGroup>
          <div className="mt-4">
            <LabeledInputField
              id="city"
              label="City"
              placeholder="Enter City"
            />
            <LabeledInputField
              id="country"
              label="Country"
              placeholder="Enter Country"
            />
            <LabeledInputField
              id="state"
              label="State"
              placeholder="Enter State"
            />
          </div>
        </div>
        <LabeledInputField
          id="proposedHostvenu"
          label="Proposed Host Venu"
          placeholder="Enter Venu Name"
        />
        <div className="flex flex-col gap-y-2">
          <Label className="text-black text-base font-medium">Event Type</Label>
          <Select>
            <SelectTrigger className="bg-black w-1/2">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {venuCategory.map((event) => (
                <SelectItem key={event.value} value={event.value}>
                  {event.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-base font-medium text-black">
            Proposed Venue Type
          </p>
          <RadioGroup defaultValue="public" className="flex space-x-4">
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value="indoor" id="indoor" />
              <Label htmlFor="indoor" className="text-black">
                Indoor
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="outdoor" id="outdoor" />
              <Label htmlFor="outdoor" className="text-black">
                Outdoor
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hybrid" id="hybird" />
              <Label htmlFor="no" className="text-black">
                Hybrid
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col">
          <Label className="text-black font-medium text-base">
            Nearest airport
          </Label>
          <div className=" grid grid-cols-3 gap-4 mt-3">
            <LabeledInputField
              id="airportName"
              label=""
              placeholder="Airport Name"
            />
            <LabeledInputField
              id="distance"
              label=""
              placeholder="Distance from Host Venue in Km"
            />
            <LabeledInputField id="minutes" label="" placeholder="Minutes" />
          </div>
        </div>
        <div className="flex flex-col">
          <Label className="text-black font-medium text-base">
            Nearest Railway Station
          </Label>
          <div className=" grid grid-cols-3 gap-4 mt-3">
            <LabeledInputField
              id="stationName"
              label=""
              placeholder="Station Name"
            />
            <LabeledInputField
              id="distance"
              label=""
              placeholder="Distance from Host Venue in Km"
            />
            <LabeledInputField id="minutes" label="" placeholder="Minutes" />
          </div>
        </div>
        <div>
          <div className="w-full max-w-sm">
            <Label className="mb-3 font-medium text-base text-black">
              Proposed Event Dates
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "yyyy-MM-dd")} -{" "}
                        {format(date.to, "yyyy-MM-dd")}
                      </>
                    ) : (
                      format(date.from, "yyyy-MM-dd")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-black text-base font-medium">
            Proposed Event Broadcast
          </Label>
          <Select>
            <SelectTrigger className="bg-black w-1/2">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {stageTypes.map((event) => (
                <SelectItem key={event.value} value={event.value}>
                  {event.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <LabeledInputField
          id="country"
          label="Projected Audience Size"
          placeholder="Enter Number of Event Guest"
        />
        <div className="space-y-2 ">
          <p className="text-base font-medium text-black">
            Is this online Event only
          </p>
          <RadioGroup defaultValue="public" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="text-black">
                Private
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="freeForPublic" id="freeForPublic" />
              <Label htmlFor="freeForPublic" className="text-black">
                Free For Public
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="freeRSVP" id="freeRSVP" />
              <Label htmlFor="freeRSVP" className="text-black">
                Free But RSVP
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label className="text-black text-base font-medium">
            Projected Revenue From Ticket Sales
          </Label>
          <div className="grid grid-cols-2">
          <LabeledInputField
            id="currency"
            label=""
            placeholder="Currency"
          />
           <LabeledInputField
            id="amount"
            label=""
            placeholder="Amount"
          />
          </div>
        
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-black text-base font-medium">Official Ticketing Platform</Label>
          <Select>
            <SelectTrigger className="bg-black w-1/2">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {platformsTypes.map((event) => (
                <SelectItem key={event.value} value={event.value}>
                  {event.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <LabeledInputField
            id="ticketingPlatformName"
            label="Ticketing Platform Name"
            placeholder="Name of Ticketing Platform Name"
          />

        <Button type="submit">Submit</Button>
      </div>
    </Card>
  );
}
