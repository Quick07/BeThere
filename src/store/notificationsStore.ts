import { create } from "zustand";
import type { Notification, NotificationSetting } from "@/types";

interface NotificationsState {
  notifications: Notification[];
  settings: NotificationSetting | null;
  unreadCount: number;
  isLoading: boolean;

  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearAll: () => void;
  
  setSettings: (settings: NotificationSetting) => void;
  updateSettings: (updates: Partial<NotificationSetting>) => void;
  
  setLoading: (loading: boolean) => void;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  settings: null,
  unreadCount: 0,
  isLoading: false,

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.readAt).length,
    }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + (notification.readAt ? 0 : 1),
    })),

  markAsRead: (notificationId) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === notificationId);
      if (!notification || notification.readAt) return state;
      
      return {
        notifications: state.notifications.map((n) =>
          n.id === notificationId ? { ...n, readAt: new Date() } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({
        ...n,
        readAt: n.readAt || new Date(),
      })),
      unreadCount: 0,
    })),

  removeNotification: (notificationId) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === notificationId);
      return {
        notifications: state.notifications.filter((n) => n.id !== notificationId),
        unreadCount: notification && !notification.readAt
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
      };
    }),

  clearAll: () => set({ notifications: [], unreadCount: 0 }),

  setSettings: (settings) => set({ settings }),

  updateSettings: (updates) =>
    set((state) => ({
      settings: state.settings ? { ...state.settings, ...updates } : null,
    })),

  setLoading: (loading) => set({ isLoading: loading }),
}));

// Demo notifications
export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    userId: "demo-user-1",
    type: "PARTICIPANT_JOINED",
    payload: {
      activityId: "activity-1",
      activityTitle: "Gym",
      userId: "friend-1",
      userName: "Jordan Kim",
      message: "Jordan Kim joined your Gym activity",
    },
    readAt: null,
    createdAt: new Date(Date.now() - 300000), // 5 mins ago
  },
  {
    id: "notif-2",
    userId: "demo-user-1",
    type: "ACTIVITY_CREATED",
    payload: {
      activityId: "activity-friend-1",
      activityTitle: "Study Session",
      userId: "friend-2",
      userName: "Sam Chen",
      message: "Sam Chen scheduled Study Session for 3:00 PM",
    },
    readAt: null,
    createdAt: new Date(Date.now() - 600000), // 10 mins ago
  },
  {
    id: "notif-3",
    userId: "demo-user-1",
    type: "FRIEND_ACCEPTED",
    payload: {
      userId: "friend-5",
      userName: "Taylor Wilson",
      message: "Taylor Wilson accepted your friend request",
    },
    readAt: new Date(Date.now() - 1800000), // read 30 mins ago
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
  },
];

