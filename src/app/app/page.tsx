"use client";

import { AppShell } from "@/components/layout";
import { StatusSidebar } from "@/components/status";
import { DayTracker } from "@/components/tracker";
import { FriendsPanel } from "@/components/friends";
import { ActivityModal } from "@/components/activity";
import { NotificationToasts } from "@/components/notifications";

export default function AppPage() {
  return (
    <AppShell>
      {/* Main Three-Panel Layout */}
      <div className="flex w-full h-[calc(100vh-4rem)]">
        {/* Left: Status Sidebar */}
        <StatusSidebar />

        {/* Center: Day Tracker */}
        <DayTracker />

        {/* Right: Friends Panel */}
        <FriendsPanel />
      </div>

      {/* Modals */}
      <ActivityModal />

      {/* Toast Notifications */}
      <NotificationToasts />
    </AppShell>
  );
}
