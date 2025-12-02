// ============================================================================
// UI CONSTANTS
// ============================================================================

export const HOUR_HEIGHT = 60; // pixels per hour in day tracker
export const MIN_ACTIVITY_DURATION = 15; // minutes
export const DEFAULT_ACTIVITY_DURATION = 60; // minutes
export const QUICK_EXIT_DURATION = 5; // minutes

// ============================================================================
// TIME CONSTANTS
// ============================================================================

export const HOURS_IN_DAY = 24;
export const MINUTES_IN_HOUR = 60;
export const TIME_SNAP_INTERVAL = 15; // Snap to 15-minute intervals

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// ============================================================================
// STATUS COLORS
// ============================================================================

export const STATUS_COLORS = {
  gym: "#ef4444",
  bored: "#8b5cf6",
  food: "#f59e0b",
  beach: "#06b6d4",
  movie: "#ec4899",
  dnd: "#6b7280",
  study: "#22c55e",
  custom: "#3b82f6",
} as const;

// ============================================================================
// STATUS ICONS
// ============================================================================

export const STATUS_ICONS = {
  gym: "Dumbbell",
  bored: "Meh",
  food: "Utensils",
  beach: "Umbrella",
  movie: "Film",
  dnd: "Moon",
  study: "BookOpen",
  custom: "Circle",
} as const;

// ============================================================================
// LOCAL STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  user: "bethere_user",
  theme: "bethere_theme",
  selectedTracker: "bethere_selected_tracker",
  sidebarCollapsed: "bethere_sidebar_collapsed",
  friendsPanelCollapsed: "bethere_friends_panel_collapsed",
} as const;

// ============================================================================
// API ENDPOINTS (for future backend integration)
// ============================================================================

export const API_ENDPOINTS = {
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    register: "/api/auth/register",
  },
  users: {
    me: "/api/users/me",
    update: "/api/users/me",
  },
  friends: {
    list: "/api/friends",
    add: "/api/friends",
    accept: "/api/friends/accept",
    block: "/api/friends/block",
    remove: "/api/friends",
  },
  groups: {
    list: "/api/groups",
    create: "/api/groups",
    update: "/api/groups",
    delete: "/api/groups",
    members: "/api/groups/members",
  },
  trackers: {
    list: "/api/trackers",
    create: "/api/trackers",
    update: "/api/trackers",
    delete: "/api/trackers",
  },
  activities: {
    list: "/api/activities",
    create: "/api/activities",
    update: "/api/activities",
    delete: "/api/activities",
    join: "/api/activities/join",
    leave: "/api/activities/leave",
    quickExit: "/api/activities/quick-exit",
  },
  statuses: {
    list: "/api/statuses",
    create: "/api/statuses",
    update: "/api/statuses",
    delete: "/api/statuses",
  },
  notifications: {
    list: "/api/notifications",
    markRead: "/api/notifications/read",
    settings: "/api/notifications/settings",
  },
} as const;

// ============================================================================
// WEBSOCKET EVENTS
// ============================================================================

export const WS_EVENTS = {
  // Activity events
  ACTIVITY_CREATED: "activity.created",
  ACTIVITY_UPDATED: "activity.updated",
  ACTIVITY_DELETED: "activity.deleted",
  ACTIVITY_ENDING_SOON: "activity.endingSoon",
  
  // Participation events
  PARTICIPANT_JOINED: "participant.joined",
  PARTICIPANT_LEFT: "participant.left",
  
  // Presence events
  PRESENCE_UPDATED: "presence.updated",
  
  // Notification events
  NOTIFICATION: "notification",
  
  // Friend events
  FRIEND_REQUEST: "friend.request",
  FRIEND_ACCEPTED: "friend.accepted",
} as const;

// ============================================================================
// MUTE OPTIONS
// ============================================================================

export const MUTE_DURATIONS = [
  { label: "15 minutes", minutes: 15 },
  { label: "1 hour", minutes: 60 },
  { label: "4 hours", minutes: 240 },
  { label: "8 hours", minutes: 480 },
  { label: "24 hours", minutes: 1440 },
  { label: "Until I turn it back on", minutes: null },
] as const;

