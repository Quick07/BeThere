"use client";

import { useEffect, type ReactNode } from "react";
import { Header } from "./Header";
import {
  useUserStore,
  useFriendsStore,
  useActivitiesStore,
  useNotificationsStore,
  DEMO_USER,
  DEMO_FRIENDS,
  DEMO_GROUPS,
  DEMO_STATUS_TEMPLATES,
  DEMO_DAY_TRACKERS,
  DEMO_ACTIVITIES,
  DEMO_NOTIFICATIONS,
} from "@/store";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { setCurrentUser, isLoading: userLoading } = useUserStore();
  const { setFriends, setGroups } = useFriendsStore();
  const { setStatusTemplates, setDayTrackers, setActivities, setSelectedTrackerId } =
    useActivitiesStore();
  const { setNotifications } = useNotificationsStore();

  // Initialize demo data on mount
  useEffect(() => {
    // Set demo user
    setCurrentUser(DEMO_USER);

    // Set demo friends and groups
    setFriends(DEMO_FRIENDS);
    setGroups(DEMO_GROUPS);

    // Set demo status templates, trackers, and activities
    setStatusTemplates(DEMO_STATUS_TEMPLATES);
    setDayTrackers(DEMO_DAY_TRACKERS);
    setActivities(DEMO_ACTIVITIES);
    setSelectedTrackerId(DEMO_DAY_TRACKERS[0].id);

    // Set demo notifications
    setNotifications(DEMO_NOTIFICATIONS);
  }, [
    setCurrentUser,
    setFriends,
    setGroups,
    setStatusTemplates,
    setDayTrackers,
    setActivities,
    setSelectedTrackerId,
    setNotifications,
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex overflow-hidden">{children}</main>
    </div>
  );
}

