"use client";

import { useState } from "react";
import {
  Bell,
  Settings,
  ChevronDown,
  Calendar,
  Users,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, Button } from "@/components/ui";
import { useUserStore, useNotificationsStore, useUIStore } from "@/store";
import { formatDate } from "@/lib/utils";
import { useActivitiesStore } from "@/store/activitiesStore";

export function Header() {
  const { currentUser } = useUserStore();
  const { unreadCount } = useNotificationsStore();
  const { openSettingsModal, theme, toggleTheme } = useUIStore();
  const { selectedDate, dayTrackers, selectedTrackerId, setSelectedTrackerId } =
    useActivitiesStore();
  const [showTrackerMenu, setShowTrackerMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentTracker = dayTrackers.find((t) => t.id === selectedTrackerId);

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-surface-800/50 glass">
      {/* Left: Logo & Date */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text font-display">
            BeThere
          </span>
        </div>

        <div className="h-6 w-px bg-surface-700" />

        <div className="flex items-center gap-3">
          <span className="text-surface-300">{formatDate(selectedDate)}</span>

          {/* Day Tracker Selector */}
          <div className="relative">
            <button
              onClick={() => setShowTrackerMenu(!showTrackerMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800/50 hover:bg-surface-700/50 transition-colors"
            >
              <Users size={14} className="text-surface-400" />
              <span className="text-sm text-surface-200">
                {currentTracker?.name || "All Friends"}
              </span>
              <ChevronDown size={14} className="text-surface-400" />
            </button>

            {showTrackerMenu && (
              <div className="absolute top-full left-0 mt-2 w-48 glass rounded-xl shadow-xl animate-slide-down z-50">
                <div className="p-2">
                  <button
                    onClick={() => {
                      setSelectedTrackerId(null);
                      setShowTrackerMenu(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      !selectedTrackerId
                        ? "bg-primary-500/20 text-primary-300"
                        : "text-surface-300 hover:bg-surface-700/50"
                    )}
                  >
                    All Friends
                  </button>
                  {dayTrackers.map((tracker) => (
                    <button
                      key={tracker.id}
                      onClick={() => {
                        setSelectedTrackerId(tracker.id);
                        setShowTrackerMenu(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedTrackerId === tracker.id
                          ? "bg-primary-500/20 text-primary-300"
                          : "text-surface-300 hover:bg-surface-700/50"
                      )}
                    >
                      {tracker.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: Theme Toggle, Notifications & Profile */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-colors"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-primary-500 text-white rounded-full">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <NotificationsDropdown onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* Settings */}
        <button
          onClick={openSettingsModal}
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-colors"
        >
          <Settings size={20} />
        </button>

        {/* Profile */}
        {currentUser && (
          <div className="flex items-center gap-3 pl-4 ml-2 border-l border-surface-700">
            <Avatar
              name={currentUser.displayName}
              imageUrl={currentUser.avatarUrl}
              size="sm"
              isOnline={currentUser.isOnline}
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-surface-100">
                {currentUser.displayName}
              </p>
              <p className="text-xs text-surface-500">@{currentUser.username}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NotificationsDropdown({ onClose }: { onClose: () => void }) {
  const { notifications, markAsRead, markAllAsRead } = useNotificationsStore();

  return (
    <div className="absolute top-full right-0 mt-2 w-80 glass rounded-xl shadow-xl animate-slide-down z-50">
      <div className="p-3 border-b border-surface-700/50 flex items-center justify-between">
        <h3 className="font-semibold text-surface-100">Notifications</h3>
        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
          Mark all read
        </Button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-surface-500">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={cn(
                "p-3 border-b border-surface-700/30 cursor-pointer transition-colors",
                notif.readAt ? "opacity-60" : "hover:bg-surface-800/30"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-2 h-2 mt-2 rounded-full shrink-0",
                    notif.readAt ? "bg-surface-600" : "bg-primary-500"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-surface-200 line-clamp-2">
                    {notif.payload.message}
                  </p>
                  <p className="text-xs text-surface-500 mt-1">
                    {formatTimeAgo(notif.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
