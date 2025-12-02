// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
  id: string;
  phone?: string | null;
  email?: string | null;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
  isOnline: boolean;
  lastSeenAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CurrentUser extends User {
  // Additional fields for authenticated user
}

// ============================================================================
// FRIENDSHIP TYPES
// ============================================================================

export type FriendshipStatus = "PENDING" | "ACCEPTED" | "BLOCKED";

export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: FriendshipStatus;
  createdAt: Date;
  updatedAt: Date;
  friend?: User;
  user?: User;
}

export interface Friend extends User {
  friendshipId: string;
  friendshipStatus: FriendshipStatus;
}

// ============================================================================
// GROUP TYPES
// ============================================================================

export interface FriendGroup {
  id: string;
  ownerId: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  members?: FriendGroupMember[];
  memberCount?: number;
}

export interface FriendGroupMember {
  id: string;
  groupId: string;
  userId: string;
  createdAt: Date;
  user?: User;
}

// ============================================================================
// DAY TRACKER TYPES
// ============================================================================

export interface DayTracker {
  id: string;
  ownerId: string;
  date: Date;
  groupId?: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  group?: FriendGroup | null;
  activities?: Activity[];
}

// ============================================================================
// STATUS TEMPLATE TYPES
// ============================================================================

export interface StatusTemplate {
  id: string;
  ownerId?: string | null;
  label: string;
  color: string;
  icon: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Default status templates
export const DEFAULT_STATUSES: Omit<StatusTemplate, "id" | "createdAt" | "updatedAt">[] = [
  { ownerId: null, label: "Gym", color: "#ef4444", icon: "dumbbell", isDefault: true },
  { ownerId: null, label: "Bored", color: "#8b5cf6", icon: "meh", isDefault: true },
  { ownerId: null, label: "Food", color: "#f59e0b", icon: "utensils", isDefault: true },
  { ownerId: null, label: "Beach", color: "#06b6d4", icon: "umbrella-beach", isDefault: true },
  { ownerId: null, label: "Movie", color: "#ec4899", icon: "film", isDefault: true },
  { ownerId: null, label: "Do Not Disturb", color: "#6b7280", icon: "moon", isDefault: true },
  { ownerId: null, label: "Study", color: "#22c55e", icon: "book", isDefault: true },
];

// ============================================================================
// ACTIVITY TYPES
// ============================================================================

export interface Activity {
  id: string;
  trackerId: string;
  ownerId: string;
  statusTemplateId: string;
  title?: string | null;
  startTime: Date;
  endTime: Date;
  endingSoonAt?: Date | null;
  useGroupDefaultVisibility: boolean;
  createdAt: Date;
  updatedAt: Date;
  statusTemplate?: StatusTemplate;
  owner?: User;
  participants?: ActivityParticipant[];
  visibilityOverrides?: ActivityVisibilityOverride[];
}

export interface ActivityVisibilityOverride {
  id: string;
  activityId: string;
  viewerId: string;
  canView: boolean;
  viewer?: User;
}

export type ParticipantStatus = "JOINED" | "LEFT";

export interface ActivityParticipant {
  id: string;
  activityId: string;
  userId: string;
  status: ParticipantStatus;
  joinedAt: Date;
  leftAt?: Date | null;
  user?: User;
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export interface NotificationSetting {
  id: string;
  userId: string;
  mutedGlobalUntil?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationSettingFriend {
  id: string;
  userId: string;
  friendId: string;
  muted: boolean;
}

export interface NotificationSettingGroup {
  id: string;
  userId: string;
  groupId: string;
  muted: boolean;
}

export type NotificationType =
  | "ACTIVITY_CREATED"
  | "ACTIVITY_UPDATED"
  | "ACTIVITY_DELETED"
  | "ACTIVITY_ENDING_SOON"
  | "PARTICIPANT_JOINED"
  | "PARTICIPANT_LEFT"
  | "FRIEND_REQUEST"
  | "FRIEND_ACCEPTED";

export interface NotificationPayload {
  activityId?: string;
  activityTitle?: string;
  userId?: string;
  userName?: string;
  message?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  payload: NotificationPayload;
  readAt?: Date | null;
  createdAt: Date;
}

// ============================================================================
// WEBSOCKET EVENT TYPES
// ============================================================================

export type WebSocketEvent =
  | "activity.created"
  | "activity.updated"
  | "activity.deleted"
  | "activity.endingSoon"
  | "participant.joined"
  | "participant.left"
  | "presence.updated"
  | "notification"
  | "friend.request"
  | "friend.accepted";

export interface WebSocketMessage<T = unknown> {
  event: WebSocketEvent;
  data: T;
  timestamp: Date;
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

export interface DraggedStatus {
  statusTemplate: StatusTemplate;
  startY: number;
}

export interface TimeSlot {
  hour: number;
  minute: number;
}

export interface ActivityBlock {
  activity: Activity;
  top: number;
  height: number;
  isEndingSoon: boolean;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

