import { create } from "zustand";
import type { Activity, StatusTemplate, DayTracker, ActivityParticipant } from "@/types";
import { startOfDay, addHours, addMinutes } from "date-fns";

interface ActivitiesState {
  activities: Activity[];
  statusTemplates: StatusTemplate[];
  dayTrackers: DayTracker[];
  selectedTrackerId: string | null;
  selectedDate: Date;
  isLoading: boolean;

  // Activity Actions
  setActivities: (activities: Activity[]) => void;
  addActivity: (activity: Activity) => void;
  updateActivity: (activityId: string, updates: Partial<Activity>) => void;
  removeActivity: (activityId: string) => void;
  setActivityEndingSoon: (activityId: string, endingSoonAt: Date) => void;
  addParticipant: (activityId: string, participant: ActivityParticipant) => void;
  removeParticipant: (activityId: string, userId: string) => void;

  // Status Template Actions
  setStatusTemplates: (templates: StatusTemplate[]) => void;
  addStatusTemplate: (template: StatusTemplate) => void;
  updateStatusTemplate: (templateId: string, updates: Partial<StatusTemplate>) => void;
  removeStatusTemplate: (templateId: string) => void;

  // Day Tracker Actions
  setDayTrackers: (trackers: DayTracker[]) => void;
  addDayTracker: (tracker: DayTracker) => void;
  updateDayTracker: (trackerId: string, updates: Partial<DayTracker>) => void;
  removeDayTracker: (trackerId: string) => void;

  // Selection Actions
  setSelectedTrackerId: (trackerId: string | null) => void;
  setSelectedDate: (date: Date) => void;
  setLoading: (loading: boolean) => void;
}

export const useActivitiesStore = create<ActivitiesState>((set) => ({
  activities: [],
  statusTemplates: [],
  dayTrackers: [],
  selectedTrackerId: null,
  selectedDate: startOfDay(new Date()),
  isLoading: false,

  // Activity Actions
  setActivities: (activities) => set({ activities }),
  
  addActivity: (activity) =>
    set((state) => ({ activities: [...state.activities, activity] })),
  
  updateActivity: (activityId, updates) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === activityId ? { ...a, ...updates } : a
      ),
    })),
  
  removeActivity: (activityId) =>
    set((state) => ({
      activities: state.activities.filter((a) => a.id !== activityId),
    })),
  
  setActivityEndingSoon: (activityId, endingSoonAt) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === activityId ? { ...a, endingSoonAt } : a
      ),
    })),
  
  addParticipant: (activityId, participant) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === activityId
          ? { ...a, participants: [...(a.participants || []), participant] }
          : a
      ),
    })),
  
  removeParticipant: (activityId, userId) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === activityId
          ? {
              ...a,
              participants: (a.participants || []).filter(
                (p) => p.userId !== userId
              ),
            }
          : a
      ),
    })),

  // Status Template Actions
  setStatusTemplates: (templates) => set({ statusTemplates: templates }),
  
  addStatusTemplate: (template) =>
    set((state) => ({
      statusTemplates: [...state.statusTemplates, template],
    })),
  
  updateStatusTemplate: (templateId, updates) =>
    set((state) => ({
      statusTemplates: state.statusTemplates.map((t) =>
        t.id === templateId ? { ...t, ...updates } : t
      ),
    })),
  
  removeStatusTemplate: (templateId) =>
    set((state) => ({
      statusTemplates: state.statusTemplates.filter((t) => t.id !== templateId),
    })),

  // Day Tracker Actions
  setDayTrackers: (trackers) => set({ dayTrackers: trackers }),
  
  addDayTracker: (tracker) =>
    set((state) => ({ dayTrackers: [...state.dayTrackers, tracker] })),
  
  updateDayTracker: (trackerId, updates) =>
    set((state) => ({
      dayTrackers: state.dayTrackers.map((t) =>
        t.id === trackerId ? { ...t, ...updates } : t
      ),
    })),
  
  removeDayTracker: (trackerId) =>
    set((state) => ({
      dayTrackers: state.dayTrackers.filter((t) => t.id !== trackerId),
    })),

  // Selection Actions
  setSelectedTrackerId: (trackerId) => set({ selectedTrackerId: trackerId }),
  setSelectedDate: (date) => set({ selectedDate: startOfDay(date) }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// Demo status templates
export const DEMO_STATUS_TEMPLATES: StatusTemplate[] = [
  {
    id: "status-1",
    ownerId: null,
    label: "Gym",
    color: "#ef4444",
    icon: "Dumbbell",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "status-2",
    ownerId: null,
    label: "Bored",
    color: "#8b5cf6",
    icon: "Meh",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "status-3",
    ownerId: null,
    label: "Food",
    color: "#f59e0b",
    icon: "Utensils",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "status-4",
    ownerId: null,
    label: "Beach",
    color: "#06b6d4",
    icon: "Umbrella",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "status-5",
    ownerId: null,
    label: "Movie",
    color: "#ec4899",
    icon: "Film",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "status-6",
    ownerId: null,
    label: "Do Not Disturb",
    color: "#6b7280",
    icon: "Moon",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "status-7",
    ownerId: null,
    label: "Study",
    color: "#22c55e",
    icon: "BookOpen",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Demo day trackers
export const DEMO_DAY_TRACKERS: DayTracker[] = [
  {
    id: "tracker-1",
    ownerId: "demo-user-1",
    date: startOfDay(new Date()),
    groupId: null,
    name: "My Day",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tracker-2",
    ownerId: "demo-user-1",
    date: startOfDay(new Date()),
    groupId: "group-1",
    name: "Close Friends",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Demo activities
const today = startOfDay(new Date());
export const DEMO_ACTIVITIES: Activity[] = [
  {
    id: "activity-1",
    trackerId: "tracker-1",
    ownerId: "demo-user-1",
    statusTemplateId: "status-1",
    title: null,
    startTime: addHours(today, 18),
    endTime: addHours(today, 19),
    endingSoonAt: null,
    useGroupDefaultVisibility: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    statusTemplate: DEMO_STATUS_TEMPLATES[0],
    participants: [
      {
        id: "part-1",
        activityId: "activity-1",
        userId: "friend-1",
        status: "JOINED",
        joinedAt: new Date(),
        user: {
          id: "friend-1",
          username: "jordan_k",
          displayName: "Jordan Kim",
          isOnline: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        id: "part-2",
        activityId: "activity-1",
        userId: "friend-2",
        status: "JOINED",
        joinedAt: new Date(),
        user: {
          id: "friend-2",
          username: "sam_chen",
          displayName: "Sam Chen",
          isOnline: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    id: "activity-2",
    trackerId: "tracker-1",
    ownerId: "demo-user-1",
    statusTemplateId: "status-5",
    title: "Movie Night",
    startTime: addHours(today, 20),
    endTime: addMinutes(addHours(today, 22), 30),
    endingSoonAt: null,
    useGroupDefaultVisibility: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    statusTemplate: DEMO_STATUS_TEMPLATES[4],
    participants: [
      {
        id: "part-3",
        activityId: "activity-2",
        userId: "friend-1",
        status: "JOINED",
        joinedAt: new Date(),
        user: {
          id: "friend-1",
          username: "jordan_k",
          displayName: "Jordan Kim",
          isOnline: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        id: "part-4",
        activityId: "activity-2",
        userId: "friend-3",
        status: "JOINED",
        joinedAt: new Date(),
        user: {
          id: "friend-3",
          username: "riley_j",
          displayName: "Riley Johnson",
          isOnline: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        id: "part-5",
        activityId: "activity-2",
        userId: "friend-5",
        status: "JOINED",
        joinedAt: new Date(),
        user: {
          id: "friend-5",
          username: "taylor_w",
          displayName: "Taylor Wilson",
          isOnline: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
];

