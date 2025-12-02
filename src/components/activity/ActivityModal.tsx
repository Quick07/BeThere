"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Clock,
  Users,
  Eye,
  LogOut,
  UserPlus,
  Trash2,
  Timer,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { cn, formatTimeRange, hexToRgba } from "@/lib/utils";
import { Modal, Button, Avatar, Badge, TimePicker } from "@/components/ui";
import { useUIStore, useActivitiesStore, useFriendsStore, useUserStore } from "@/store";
import { QUICK_EXIT_DURATION } from "@/lib/constants";
import { addMinutes } from "date-fns";

export function ActivityModal() {
  const { modals, closeActivityModal } = useUIStore();
  const { updateActivity, removeActivity, addParticipant, setActivityEndingSoon } =
    useActivitiesStore();
  const { friends } = useFriendsStore();
  const { currentUser } = useUserStore();

  const { isActivityModalOpen, selectedActivity } = modals;
  const [showVisibilityPanel, setShowVisibilityPanel] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [editStartTime, setEditStartTime] = useState<Date | null>(null);
  const [editEndTime, setEditEndTime] = useState<Date | null>(null);

  const isOwner = selectedActivity?.ownerId === currentUser?.id;
  const isEndingSoon = useMemo(() => {
    if (!selectedActivity?.endingSoonAt) return false;
    return new Date() < new Date(selectedActivity.endingSoonAt);
  }, [selectedActivity?.endingSoonAt]);

  const isParticipant = useMemo(() => {
    if (!selectedActivity || !currentUser) return false;
    return selectedActivity.participants?.some(
      (p) => p.userId === currentUser.id && p.status === "JOINED"
    );
  }, [selectedActivity, currentUser]);

  // Initialize edit times when activity changes
  useEffect(() => {
    if (selectedActivity) {
      setEditStartTime(new Date(selectedActivity.startTime));
      setEditEndTime(new Date(selectedActivity.endTime));
    }
  }, [selectedActivity]);

  if (!selectedActivity) return null;

  const { statusTemplate, participants, startTime, endTime, title } = selectedActivity;
  const color = statusTemplate?.color || "#3b82f6";
  const label = title || statusTemplate?.label || "Activity";

  const handleQuickExit = () => {
    const endingSoonAt = addMinutes(new Date(), QUICK_EXIT_DURATION);
    setActivityEndingSoon(selectedActivity.id, endingSoonAt);
  };

  const handleJoin = () => {
    if (!currentUser) return;
    addParticipant(selectedActivity.id, {
      id: `part-${Date.now()}`,
      activityId: selectedActivity.id,
      userId: currentUser.id,
      status: "JOINED",
      joinedAt: new Date(),
      user: currentUser,
    });
  };

  const handleDelete = () => {
    removeActivity(selectedActivity.id);
    closeActivityModal();
  };

  const handleSaveTime = () => {
    if (editStartTime && editEndTime && editEndTime > editStartTime) {
      updateActivity(selectedActivity.id, {
        startTime: editStartTime,
        endTime: editEndTime,
      });
      setIsEditingTime(false);
    }
  };

  const handleCancelEdit = () => {
    setEditStartTime(new Date(startTime));
    setEditEndTime(new Date(endTime));
    setIsEditingTime(false);
  };

  return (
    <Modal
      isOpen={isActivityModalOpen}
      onClose={closeActivityModal}
      size="md"
    >
      {/* Header with Color */}
      <div
        className="-mx-6 -mt-4 px-6 py-6 rounded-t-2xl mb-4"
        style={{ backgroundColor: hexToRgba(color, 0.2) }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color }}
            >
              {label}
            </h2>
            
            {/* Time Display / Edit */}
            {!isEditingTime ? (
              <div className="flex items-center gap-2 mt-1">
                <p className="text-surface-300 flex items-center gap-2">
                  <Clock size={14} />
                  {formatTimeRange(startTime, endTime)}
                </p>
                {isOwner && (
                  <button
                    onClick={() => setIsEditingTime(true)}
                    className="p-1 rounded text-surface-400 hover:text-surface-200 hover:bg-surface-700/50 transition-colors"
                    title="Edit time"
                  >
                    <Edit2 size={14} />
                  </button>
                )}
              </div>
            ) : (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {editStartTime && (
                    <TimePicker
                      label="Start"
                      value={editStartTime}
                      onChange={setEditStartTime}
                    />
                  )}
                  {editEndTime && (
                    <TimePicker
                      label="End"
                      value={editEndTime}
                      onChange={setEditEndTime}
                      minTime={editStartTime || undefined}
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                  >
                    <X size={14} />
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveTime}
                  >
                    <Check size={14} />
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>

          {isEndingSoon && !isEditingTime && (
            <Badge variant="warning" className="flex items-center gap-1">
              <Timer size={12} />
              Ending Soon
            </Badge>
          )}
        </div>
      </div>

      {/* Participants Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-surface-400 mb-3 flex items-center gap-2">
          <Users size={14} />
          Participants ({(participants?.length || 0) + 1})
        </h3>
        <div className="space-y-2">
          {/* Owner */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-800/30">
            <Avatar
              name={currentUser?.displayName || "You"}
              size="sm"
              isOnline={true}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-surface-100">
                {isOwner ? "You" : selectedActivity.owner?.displayName || "Owner"}
              </p>
              <p className="text-xs text-surface-500">Organizer</p>
            </div>
          </div>

          {/* Other Participants */}
          {participants?.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center gap-3 p-2 rounded-lg bg-surface-800/30"
            >
              <Avatar
                name={participant.user?.displayName || "User"}
                size="sm"
                isOnline={participant.user?.isOnline}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-surface-100">
                  {participant.user?.displayName || "Unknown"}
                </p>
                <p className="text-xs text-surface-500">Joined</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visibility Section (Owner Only) */}
      {isOwner && (
        <div className="mb-6">
          <button
            onClick={() => setShowVisibilityPanel(!showVisibilityPanel)}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-800/30 hover:bg-surface-800/50 transition-colors"
          >
            <span className="flex items-center gap-2 text-sm text-surface-300">
              <Eye size={14} />
              Visibility Settings
            </span>
            <span className="text-xs text-surface-500">
              {selectedActivity.useGroupDefaultVisibility
                ? "Group Default"
                : "Custom"}
            </span>
          </button>

          {showVisibilityPanel && (
            <div className="mt-2 p-3 rounded-lg bg-surface-800/20 border border-surface-700/50">
              <p className="text-xs text-surface-500 mb-3">
                Select who can see this activity:
              </p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {friends.map((friend) => (
                  <label
                    key={friend.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-700/30 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="checkbox-custom"
                      defaultChecked={true}
                    />
                    <Avatar name={friend.displayName} size="xs" isOnline={friend.isOnline} />
                    <span className="text-sm text-surface-200">
                      {friend.displayName}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {isOwner ? (
          <>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleQuickExit}
              disabled={isEndingSoon}
            >
              <LogOut size={16} />
              {isEndingSoon ? "Ending..." : "Leaving in 5 min"}
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleJoin}
            disabled={isParticipant}
          >
            <UserPlus size={16} />
            {isParticipant ? "Joined" : "Join Activity"}
          </Button>
        )}
      </div>
    </Modal>
  );
}
