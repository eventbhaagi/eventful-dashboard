import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { LabeledInputField } from "../ui/lableInputfield";
import { RadioGroup, RadioGroupItem } from "../ui/radiobutton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const eventTypes = [
  { label: "Public Concerts & Ticketed Shows", value: "public-concerts" },
  { label: "Weddings & Private Social Events", value: "weddings-private" },
  { label: "Corporate Events & Brand Launches", value: "corporate-events" },
  {
    label: "Government Events & Tourism Festivals",
    value: "government-tourism",
  },
  { label: "College Fest & Youth Events", value: "college-fest" },
  { label: "Fundraisers & Charity Events", value: "fundraisers-charity" },
  { label: "Award Ceremonies & Televised Events", value: "award-ceremonies" },
  { label: "Devotional & Spiritual Events", value: "devotional-events" },
  { label: "International Tours & Events", value: "international-tours" },
  { label: "HORECA & Lounge Gigs", value: "horeca-gigs" },
];

const stageTypes=[
    {
        label:"Concept Stage",value:"concept-stage"
    },
    {
        label:"Pitching Stage",value:"pitching-stage"
    },
    {
        label:"LOI Received",value:"concept-stage"
    },
    {
        label:"Advance Received",value:"concept-stage"
    },
    {
        label:"Event Pre-Production",value:"concept-stage"
    },

]

export default function CreateEvent_1() {
  return (
    <Card className="w-full max-w-2xl mx-auto p-6 shadow-2xl bg-white space-y-8">
      <h1 className="text-center text-black text-4xl font-extrabold">
        Create Event
      </h1>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <Label className="text-black text-base font-medium">Event Type</Label>
          <Select>
            <SelectTrigger className="bg-black w-1/2">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {eventTypes.map((event) => (
                <SelectItem key={event.value} value={event.value}>
                  {event.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 ">
          <p className="text-base font-medium text-black">Event Acesses</p>
          <RadioGroup defaultValue="public" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public" className="text-black">
                Public
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="text-black">
                Private
              </Label>
            </div>
          </RadioGroup>
          <div className="mt-4">
            <LabeledInputField
              id="evenName"
              label="Event Name"
              placeholder="Enter Event Name"
            />
          </div>
        </div>
        <div>
          <p className="text-base font-medium text-black">
            Are you Event Host/Promoter
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
          <div className=" grid grid-cols-2 gap-4 mt-3">
            <LabeledInputField
              id="clientName"
              label="Client Name"
              placeholder="Enter Client Name"
            />
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
              id="emailAddress"
              label="Email Address"
              placeholder="Enter Email Address"
            />
            <LabeledInputField
              id="emailAddress"
              label="Whatsapp Number"
              placeholder="Enter Whatsapp Number"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-black text-base font-medium">Stage Type</Label>
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
        <Button type="submit">Next</Button>
      </div>
    </Card>
  );
}
