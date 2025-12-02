import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, CurrentUser } from "@/types";

interface UserState {
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setCurrentUser: (user: CurrentUser | null) => void;
  updateUser: (updates: Partial<CurrentUser>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      isLoading: true,

      setCurrentUser: (user) =>
        set({
          currentUser: user,
          isAuthenticated: !!user,
          isLoading: false,
        }),

      updateUser: (updates) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...updates }
            : null,
        })),

      logout: () =>
        set({
          currentUser: null,
          isAuthenticated: false,
        }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "bethere-user",
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);

// Demo user for development
export const DEMO_USER: CurrentUser = {
  id: "demo-user-1",
  username: "demo",
  displayName: "Alex Demo",
  email: "alex@example.com",
  phone: "+1234567890",
  avatarUrl: null,
  isOnline: true,
  lastSeenAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

