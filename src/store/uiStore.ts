import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StatusTemplate, Activity } from "@/types";

interface DragState {
  isDragging: boolean;
  draggedStatus: StatusTemplate | null;
  dragStartY: number;
  currentY: number;
}

interface ModalState {
  isActivityModalOpen: boolean;
  selectedActivity: Activity | null;
  isAddFriendModalOpen: boolean;
  isCreateStatusModalOpen: boolean;
  isCreateGroupModalOpen: boolean;
  isSettingsModalOpen: boolean;
}

type Theme = "light" | "dark";

interface UIState {
  // Theme
  theme: Theme;
  
  // Sidebar states
  isSidebarCollapsed: boolean;
  sidebarWidth: number;
  isFriendsPanelCollapsed: boolean;
  friendsPanelWidth: number;
  
  // Drag state
  drag: DragState;
  
  // Modal states
  modals: ModalState;
  
  // Toast/notification state
  toasts: ToastMessage[];
  
  // Theme actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  
  // Sidebar actions
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarWidth: (width: number) => void;
  setFriendsPanelCollapsed: (collapsed: boolean) => void;
  toggleFriendsPanelCollapsed: () => void;
  setFriendsPanelWidth: (width: number) => void;
  
  // Drag actions
  startDrag: (status: StatusTemplate, startY: number) => void;
  updateDrag: (currentY: number) => void;
  endDrag: () => void;
  
  // Modal actions
  openActivityModal: (activity: Activity | null) => void;
  closeActivityModal: () => void;
  openAddFriendModal: () => void;
  closeAddFriendModal: () => void;
  openCreateStatusModal: () => void;
  closeCreateStatusModal: () => void;
  openCreateGroupModal: () => void;
  closeCreateGroupModal: () => void;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
  
  // Toast actions
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
}

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  duration?: number;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Initial states
      theme: "dark",
      isSidebarCollapsed: false,
      sidebarWidth: 256,
      isFriendsPanelCollapsed: false,
      friendsPanelWidth: 288,
      
      drag: {
        isDragging: false,
        draggedStatus: null,
        dragStartY: 0,
        currentY: 0,
      },
      
      modals: {
        isActivityModalOpen: false,
        selectedActivity: null,
        isAddFriendModalOpen: false,
        isCreateStatusModalOpen: false,
        isCreateGroupModalOpen: false,
        isSettingsModalOpen: false,
      },
      
      toasts: [],

      // Theme actions
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),

      // Sidebar actions
      setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
      toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setSidebarWidth: (width) => set({ sidebarWidth: Math.max(180, Math.min(400, width)) }),
      setFriendsPanelCollapsed: (collapsed) => set({ isFriendsPanelCollapsed: collapsed }),
      toggleFriendsPanelCollapsed: () => set((state) => ({ isFriendsPanelCollapsed: !state.isFriendsPanelCollapsed })),
      setFriendsPanelWidth: (width) => set({ friendsPanelWidth: Math.max(200, Math.min(450, width)) }),

      // Drag actions
      startDrag: (status, startY) =>
        set({
          drag: {
            isDragging: true,
            draggedStatus: status,
            dragStartY: startY,
            currentY: startY,
          },
        }),

      updateDrag: (currentY) =>
        set((state) => ({
          drag: { ...state.drag, currentY },
        })),

      endDrag: () =>
        set({
          drag: {
            isDragging: false,
            draggedStatus: null,
            dragStartY: 0,
            currentY: 0,
          },
        }),

      // Modal actions
      openActivityModal: (activity) =>
        set((state) => ({
          modals: {
            ...state.modals,
            isActivityModalOpen: true,
            selectedActivity: activity,
          },
        })),

      closeActivityModal: () =>
        set((state) => ({
          modals: {
            ...state.modals,
            isActivityModalOpen: false,
            selectedActivity: null,
          },
        })),

      openAddFriendModal: () =>
        set((state) => ({
          modals: { ...state.modals, isAddFriendModalOpen: true },
        })),

      closeAddFriendModal: () =>
        set((state) => ({
          modals: { ...state.modals, isAddFriendModalOpen: false },
        })),

      openCreateStatusModal: () =>
        set((state) => ({
          modals: { ...state.modals, isCreateStatusModalOpen: true },
        })),

      closeCreateStatusModal: () =>
        set((state) => ({
          modals: { ...state.modals, isCreateStatusModalOpen: false },
        })),

      openCreateGroupModal: () =>
        set((state) => ({
          modals: { ...state.modals, isCreateGroupModalOpen: true },
        })),

      closeCreateGroupModal: () =>
        set((state) => ({
          modals: { ...state.modals, isCreateGroupModalOpen: false },
        })),

      openSettingsModal: () =>
        set((state) => ({
          modals: { ...state.modals, isSettingsModalOpen: true },
        })),

      closeSettingsModal: () =>
        set((state) => ({
          modals: { ...state.modals, isSettingsModalOpen: false },
        })),

      // Toast actions
      addToast: (toast) =>
        set((state) => ({
          toasts: [
            ...state.toasts,
            { ...toast, id: crypto.randomUUID() },
          ],
        })),

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "bethere-ui",
      partialize: (state) => ({
        theme: state.theme,
        sidebarWidth: state.sidebarWidth,
        isSidebarCollapsed: state.isSidebarCollapsed,
        friendsPanelWidth: state.friendsPanelWidth,
        isFriendsPanelCollapsed: state.isFriendsPanelCollapsed,
      }),
    }
  )
);
