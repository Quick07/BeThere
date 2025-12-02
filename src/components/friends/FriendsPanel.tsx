"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  Search,
  UserPlus,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  BellOff,
  UserX,
  MessageCircle,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, Avatar, Modal, Input } from "@/components/ui";
import { useFriendsStore, useUIStore } from "@/store";
import type { Friend } from "@/types";

export function FriendsPanel() {
  const { friends, groups } = useFriendsStore();
  const {
    isFriendsPanelCollapsed,
    toggleFriendsPanelCollapsed,
    friendsPanelWidth,
    setFriendsPanelWidth,
  } = useUIStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [onlineExpanded, setOnlineExpanded] = useState(true);
  const [offlineExpanded, setOfflineExpanded] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) return friends;
    const query = searchQuery.toLowerCase();
    return friends.filter(
      (f) =>
        f.displayName.toLowerCase().includes(query) ||
        f.username.toLowerCase().includes(query)
    );
  }, [friends, searchQuery]);

  const onlineFriends = filteredFriends.filter((f) => f.isOnline);
  const offlineFriends = filteredFriends.filter((f) => !f.isOnline);

  // Handle resize
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !panelRef.current) return;
      const windowWidth = window.innerWidth;
      const newWidth = windowWidth - e.clientX;
      setFriendsPanelWidth(newWidth);
    },
    [isResizing, setFriendsPanelWidth]
  );

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  // Collapsed state
  if (isFriendsPanelCollapsed) {
    return (
      <aside className="w-12 h-full border-l border-surface-800/50 dark:border-surface-800/50 light:border-surface-200 glass flex flex-col items-center py-4 transition-all duration-300">
        <button
          onClick={toggleFriendsPanelCollapsed}
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-colors"
          title="Expand panel"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Mini friend indicators */}
        <div className="flex-1 flex flex-col gap-2 mt-4 overflow-y-auto items-center">
          <div className="flex flex-col gap-1">
            {onlineFriends.slice(0, 4).map((friend) => (
              <Avatar
                key={friend.id}
                name={friend.displayName}
                size="xs"
                isOnline={true}
              />
            ))}
          </div>
          {friends.length > 4 && (
            <span className="text-[10px] text-surface-500">
              +{friends.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <Users size={16} className="text-surface-500" />
        </div>
      </aside>
    );
  }

  return (
    <aside
      ref={panelRef}
      className="h-full border-l border-surface-800/50 glass flex flex-col relative transition-all duration-200"
      style={{ width: friendsPanelWidth }}
    >
      {/* Resize Handle */}
      <div
        className={cn(
          "absolute top-0 left-0 w-1 h-full cursor-ew-resize group",
          "hover:bg-primary-500/50 transition-colors",
          isResizing && "bg-primary-500"
        )}
        onMouseDown={handleResizeStart}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-1 h-6 rounded-full bg-primary-500/50" />
        </div>
      </div>

      {/* Header */}
      <div className="p-4 border-b border-surface-800/50">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={toggleFriendsPanelCollapsed}
            className="p-1.5 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-colors"
            title="Collapse panel"
          >
            <ChevronRight size={18} />
          </button>
          <h2 className="text-lg font-semibold text-surface-100">Friends</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAddFriendModal(true)}
            className="!p-2"
          >
            <UserPlus size={18} />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500"
          />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-surface-800/50 border border-surface-700 text-surface-200 placeholder:text-surface-500 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      {/* Friend Lists */}
      <div className="flex-1 overflow-y-auto">
        {/* Online Friends */}
        <div className="p-2">
          <button
            onClick={() => setOnlineExpanded(!onlineExpanded)}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-surface-400 hover:text-surface-300 transition-colors"
          >
            {onlineExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <span>ONLINE</span>
            <span className="ml-auto text-green-500">{onlineFriends.length}</span>
          </button>

          {onlineExpanded && (
            <div className="space-y-1 mt-1">
              {onlineFriends.map((friend, index) => (
                <FriendItem
                  key={friend.id}
                  friend={friend}
                  index={index}
                  onSelect={() => setSelectedFriend(friend)}
                />
              ))}
              {onlineFriends.length === 0 && (
                <p className="px-3 py-2 text-xs text-surface-500">
                  No friends online
                </p>
              )}
            </div>
          )}
        </div>

        {/* Offline Friends */}
        <div className="p-2">
          <button
            onClick={() => setOfflineExpanded(!offlineExpanded)}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-surface-400 hover:text-surface-300 transition-colors"
          >
            {offlineExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <span>OFFLINE</span>
            <span className="ml-auto text-surface-500">{offlineFriends.length}</span>
          </button>

          {offlineExpanded && (
            <div className="space-y-1 mt-1">
              {offlineFriends.map((friend, index) => (
                <FriendItem
                  key={friend.id}
                  friend={friend}
                  index={index + onlineFriends.length}
                  onSelect={() => setSelectedFriend(friend)}
                />
              ))}
              {offlineFriends.length === 0 && (
                <p className="px-3 py-2 text-xs text-surface-500">
                  All friends are online!
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Groups Section */}
      <div className="p-4 border-t border-surface-800/50">
        <h3 className="text-xs font-medium text-surface-400 mb-2">GROUPS</h3>
        <div className="space-y-1">
          {groups.map((group) => (
            <div
              key={group.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-800/50 cursor-pointer transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: group.color }}
              />
              <span className="text-sm text-surface-200 flex-1 truncate">
                {group.name}
              </span>
              <span className="text-xs text-surface-500">
                {group.memberCount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Friend Modal */}
      <AddFriendModal
        isOpen={showAddFriendModal}
        onClose={() => setShowAddFriendModal(false)}
      />

      {/* Friend Options Modal */}
      {selectedFriend && (
        <FriendOptionsModal
          friend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
      )}
    </aside>
  );
}

interface FriendItemProps {
  friend: Friend;
  index: number;
  onSelect: () => void;
}

function FriendItem({ friend, index, onSelect }: FriendItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-2 py-2 rounded-lg",
        "hover:bg-surface-800/50 cursor-pointer transition-all group",
        "animate-slide-up opacity-0",
        `stagger-${Math.min(index + 1, 8)}`
      )}
      style={{ animationFillMode: "forwards" }}
    >
      <Avatar
        name={friend.displayName}
        size="sm"
        isOnline={friend.isOnline}
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-surface-100 truncate">
          {friend.displayName}
        </p>
        <p className="text-xs text-surface-500 truncate">@{friend.username}</p>
      </div>

      {/* Visibility Checkbox */}
      <input
        type="checkbox"
        className="checkbox-custom opacity-0 group-hover:opacity-100 transition-opacity"
        defaultChecked
        onClick={(e) => e.stopPropagation()}
      />

      {/* More Options */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="p-1 rounded opacity-0 group-hover:opacity-100 text-surface-500 hover:text-surface-300 hover:bg-surface-700/50 transition-all"
      >
        <MoreVertical size={14} />
      </button>
    </div>
  );
}

function AddFriendModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [searchType, setSearchType] = useState<"phone" | "email" | "username">(
    "phone"
  );
  const [searchValue, setSearchValue] = useState("");

  const handleSendRequest = () => {
    console.log(`Sending friend request via ${searchType}: ${searchValue}`);
    setSearchValue("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Friend" size="sm">
      <div className="space-y-4">
        {/* Search Type Tabs */}
        <div className="flex gap-1 p-1 bg-surface-800/50 rounded-lg">
          {(["phone", "email", "username"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSearchType(type)}
              className={cn(
                "flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors capitalize",
                searchType === type
                  ? "bg-primary-500 text-white"
                  : "text-surface-400 hover:text-surface-200"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <Input
          placeholder={
            searchType === "phone"
              ? "+1 234 567 8900"
              : searchType === "email"
              ? "friend@example.com"
              : "username"
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {/* Send Request Button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handleSendRequest}
          disabled={!searchValue.trim()}
        >
          <UserPlus size={16} />
          Send Friend Request
        </Button>
      </div>
    </Modal>
  );
}

function FriendOptionsModal({
  friend,
  onClose,
}: {
  friend: Friend;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={true} onClose={onClose} size="sm">
      <div className="flex items-center gap-3 mb-4">
        <Avatar name={friend.displayName} size="lg" isOnline={friend.isOnline} />
        <div>
          <h3 className="font-semibold text-surface-100">{friend.displayName}</h3>
          <p className="text-sm text-surface-500">@{friend.username}</p>
        </div>
      </div>

      <div className="space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-surface-300 hover:bg-surface-800/50 transition-colors">
          <MessageCircle size={18} />
          <span>View Profile</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-surface-300 hover:bg-surface-800/50 transition-colors">
          <BellOff size={18} />
          <span>Mute Notifications</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
          <UserX size={18} />
          <span>Remove Friend</span>
        </button>
      </div>
    </Modal>
  );
}
