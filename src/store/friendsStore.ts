import { create } from "zustand";
import type { Friend, FriendGroup, Friendship } from "@/types";

interface FriendsState {
  friends: Friend[];
  groups: FriendGroup[];
  pendingRequests: Friendship[];
  selectedGroupId: string | null;
  isLoading: boolean;

  // Actions
  setFriends: (friends: Friend[]) => void;
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: string) => void;
  updateFriendStatus: (friendId: string, isOnline: boolean) => void;
  
  setGroups: (groups: FriendGroup[]) => void;
  addGroup: (group: FriendGroup) => void;
  updateGroup: (groupId: string, updates: Partial<FriendGroup>) => void;
  removeGroup: (groupId: string) => void;
  
  setPendingRequests: (requests: Friendship[]) => void;
  addPendingRequest: (request: Friendship) => void;
  removePendingRequest: (requestId: string) => void;
  
  setSelectedGroupId: (groupId: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useFriendsStore = create<FriendsState>((set) => ({
  friends: [],
  groups: [],
  pendingRequests: [],
  selectedGroupId: null,
  isLoading: false,

  setFriends: (friends) => set({ friends }),
  
  addFriend: (friend) =>
    set((state) => ({ friends: [...state.friends, friend] })),
  
  removeFriend: (friendId) =>
    set((state) => ({
      friends: state.friends.filter((f) => f.id !== friendId),
    })),
  
  updateFriendStatus: (friendId, isOnline) =>
    set((state) => ({
      friends: state.friends.map((f) =>
        f.id === friendId ? { ...f, isOnline } : f
      ),
    })),

  setGroups: (groups) => set({ groups }),
  
  addGroup: (group) =>
    set((state) => ({ groups: [...state.groups, group] })),
  
  updateGroup: (groupId, updates) =>
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId ? { ...g, ...updates } : g
      ),
    })),
  
  removeGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.filter((g) => g.id !== groupId),
    })),

  setPendingRequests: (requests) => set({ pendingRequests: requests }),
  
  addPendingRequest: (request) =>
    set((state) => ({
      pendingRequests: [...state.pendingRequests, request],
    })),
  
  removePendingRequest: (requestId) =>
    set((state) => ({
      pendingRequests: state.pendingRequests.filter((r) => r.id !== requestId),
    })),

  setSelectedGroupId: (groupId) => set({ selectedGroupId: groupId }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// Demo data for development
export const DEMO_FRIENDS: Friend[] = [
  {
    id: "friend-1",
    username: "jordan_k",
    displayName: "Jordan Kim",
    email: "jordan@example.com",
    isOnline: true,
    lastSeenAt: null,
    avatarUrl: null,
    friendshipId: "fs-1",
    friendshipStatus: "ACCEPTED",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "friend-2",
    username: "sam_chen",
    displayName: "Sam Chen",
    email: "sam@example.com",
    isOnline: true,
    lastSeenAt: null,
    avatarUrl: null,
    friendshipId: "fs-2",
    friendshipStatus: "ACCEPTED",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "friend-3",
    username: "riley_j",
    displayName: "Riley Johnson",
    email: "riley@example.com",
    isOnline: false,
    lastSeenAt: new Date(Date.now() - 3600000),
    avatarUrl: null,
    friendshipId: "fs-3",
    friendshipStatus: "ACCEPTED",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "friend-4",
    username: "casey_m",
    displayName: "Casey Martinez",
    email: "casey@example.com",
    isOnline: false,
    lastSeenAt: new Date(Date.now() - 7200000),
    avatarUrl: null,
    friendshipId: "fs-4",
    friendshipStatus: "ACCEPTED",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "friend-5",
    username: "taylor_w",
    displayName: "Taylor Wilson",
    email: "taylor@example.com",
    isOnline: true,
    lastSeenAt: null,
    avatarUrl: null,
    friendshipId: "fs-5",
    friendshipStatus: "ACCEPTED",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const DEMO_GROUPS: FriendGroup[] = [
  {
    id: "group-1",
    ownerId: "demo-user-1",
    name: "Close Friends",
    color: "#f97316",
    memberCount: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "group-2",
    ownerId: "demo-user-1",
    name: "Dormmates",
    color: "#8b5cf6",
    memberCount: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "group-3",
    ownerId: "demo-user-1",
    name: "Study Group",
    color: "#22c55e",
    memberCount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

