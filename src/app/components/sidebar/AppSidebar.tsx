"use client";

import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";

import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconUsers,
  IconMapPin,
  IconCreditCard,
  IconChartLine,
  IconSettings,
  IconUser,
  IconBell,
  IconTicket,
  IconBuilding,
} from "@tabler/icons-react";

export default function AppSidebar() {
  return (
    <Sidebar aria-label="Sidebar Navigation" >
      <SidebarItemGroup>
        <SidebarItem href="/" icon={IconLayoutDashboard} className="text-sm">
          Dashboard
        </SidebarItem>
        <SidebarItem href="/events" icon={IconCalendarEvent} className="text-sm">
          Events
        </SidebarItem>
        <SidebarItem href="/attendees" icon={IconUsers} className="text-sm">
          Attendees
        </SidebarItem>
        <SidebarItem href="/tickets" icon={IconTicket} className="text-sm">
          Tickets
        </SidebarItem>
        <SidebarItem href="/venues" icon={IconMapPin} className="text-sm">
          Venues
        </SidebarItem>
        <SidebarItem href="/payments" icon={IconCreditCard} className="text-sm">
          Payments
        </SidebarItem>
        <SidebarItem href="/vendors" icon={IconBuilding} className="text-sm">
          Vendors
        </SidebarItem>
        <SidebarItem href="/analytics" icon={IconChartLine} className="text-sm">
          Analytics
        </SidebarItem>
        <SidebarItem href="/notifications" icon={IconBell} className="text-sm">
          Notifications
        </SidebarItem>
      </SidebarItemGroup>

      {/* <SidebarItemGroup>
        <SidebarItem href="/profile" icon={IconUser} className="text-sm">
          Profile
        </SidebarItem>
        <SidebarItem href="/settings" icon={IconSettings} className="text-sm">
          Settings
        </SidebarItem>
      </SidebarItemGroup> */}
    </Sidebar>
  );
}
