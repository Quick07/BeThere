"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Plus,
  Dumbbell,
  Meh,
  Utensils,
  Umbrella,
  Film,
  Moon,
  BookOpen,
  Circle,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { cn, hexToRgba } from "@/lib/utils";
import { Button, Modal, Input, ColorPicker, TimePicker } from "@/components/ui";
import { useActivitiesStore, useUIStore } from "@/store";
import type { StatusTemplate } from "@/types";
import { addHours, setHours, setMinutes, startOfDay } from "date-fns";

const iconMap: Record<string, LucideIcon> = {
  Dumbbell,
  Meh,
  Utensils,
  Umbrella,
  Film,
  Moon,
  BookOpen,
  Circle,
};

export function StatusSidebar() {
  const { statusTemplates, addStatusTemplate, addActivity, selectedDate, selectedTrackerId } = useActivitiesStore();
  const { 
    startDrag, 
    isSidebarCollapsed, 
    toggleSidebarCollapsed, 
    sidebarWidth, 
    setSidebarWidth 
  } = useUIStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newStatusLabel, setNewStatusLabel] = useState("");
  const [newStatusColor, setNewStatusColor] = useState("#3b82f6");
  const [isResizing, setIsResizing] = useState(false);
  const [quickScheduleStatus, setQuickScheduleStatus] = useState<StatusTemplate | null>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const handleDragStart = (
    e: React.MouseEvent | React.TouchEvent,
    status: StatusTemplate
  ) => {
    if (isSidebarCollapsed) return;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startDrag(status, clientY);
  };

  const handleStatusClick = (status: StatusTemplate) => {
    setQuickScheduleStatus(status);
  };

  const handleCreateStatus = () => {
    if (!newStatusLabel.trim()) return;

    const newStatus: StatusTemplate = {
      id: `status-custom-${Date.now()}`,
      ownerId: "demo-user-1",
      label: newStatusLabel.trim(),
      color: newStatusColor,
      icon: "Circle",
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addStatusTemplate(newStatus);
    setNewStatusLabel("");
    setNewStatusColor("#3b82f6");
    setIsCreateModalOpen(false);
  };

  // Handle resize
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !sidebarRef.current) return;
      const newWidth = e.clientX;
      setSidebarWidth(newWidth);
    },
    [isResizing, setSidebarWidth]
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
  if (isSidebarCollapsed) {
    return (
      <aside className="w-12 h-full border-r border-surface-800/50 glass flex flex-col items-center py-4 transition-all duration-300">
        <button
          onClick={toggleSidebarCollapsed}
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-colors"
          title="Expand sidebar"
        >
          <ChevronRight size={20} />
        </button>
        
        {/* Mini status indicators */}
        <div className="flex-1 flex flex-col gap-2 mt-4 overflow-y-auto">
          {statusTemplates.slice(0, 6).map((status) => (
            <div
              key={status.id}
              className="w-6 h-6 rounded-md cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: status.color }}
              title={status.label}
              onClick={() => {
                toggleSidebarCollapsed();
                setTimeout(() => setQuickScheduleStatus(status), 300);
              }}
            />
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside 
      ref={sidebarRef}
      className="h-full border-r border-surface-800/50 glass flex flex-col relative transition-all duration-200"
      style={{ width: sidebarWidth }}
    >
      {/* Header */}
      <div className="p-4 border-b border-surface-800/50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-surface-100 mb-1">Status</h2>
          <p className="text-xs text-surface-500">Drag or click to schedule</p>
        </div>
        <button
          onClick={toggleSidebarCollapsed}
          className="p-1.5 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-colors"
          title="Collapse sidebar"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Status List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {statusTemplates.map((status, index) => (
          <StatusChip
            key={status.id}
            status={status}
            onDragStart={(e) => handleDragStart(e, status)}
            onClick={() => handleStatusClick(status)}
            animationDelay={index}
          />
        ))}
      </div>

      {/* Add Custom Status */}
      <div className="p-3 border-t border-surface-800/50">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-surface-400 hover:text-surface-200"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={18} />
          <span>Add Custom Status</span>
        </Button>
      </div>

      {/* Resize Handle */}
      <div
        className={cn(
          "absolute top-0 right-0 w-1 h-full cursor-ew-resize group",
          "hover:bg-primary-500/50 transition-colors",
          isResizing && "bg-primary-500"
        )}
        onMouseDown={handleResizeStart}
      >
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-4 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-1 h-6 rounded-full bg-primary-500/50" />
        </div>
      </div>

      {/* Create Status Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Custom Status"
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="Status Name"
            placeholder="e.g., Board Games"
            value={newStatusLabel}
            onChange={(e) => setNewStatusLabel(e.target.value)}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-surface-300">
              Color
            </label>
            <ColorPicker
              value={newStatusColor}
              onChange={setNewStatusColor}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleCreateStatus}
              disabled={!newStatusLabel.trim()}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>

      {/* Quick Schedule Modal */}
      {quickScheduleStatus && (
        <QuickScheduleModal
          status={quickScheduleStatus}
          selectedDate={selectedDate}
          selectedTrackerId={selectedTrackerId}
          onSchedule={(startTime, endTime) => {
            const newActivity = {
              id: `activity-${Date.now()}`,
              trackerId: selectedTrackerId || "tracker-1",
              ownerId: "demo-user-1",
              statusTemplateId: quickScheduleStatus.id,
              title: null,
              startTime,
              endTime,
              endingSoonAt: null,
              useGroupDefaultVisibility: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              statusTemplate: quickScheduleStatus,
              participants: [],
            };
            addActivity(newActivity);
            setQuickScheduleStatus(null);
          }}
          onClose={() => setQuickScheduleStatus(null)}
        />
      )}
    </aside>
  );
}

interface StatusChipProps {
  status: StatusTemplate;
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onClick: () => void;
  animationDelay: number;
}

function StatusChip({ status, onDragStart, onClick, animationDelay }: StatusChipProps) {
  const Icon = iconMap[status.icon] || Circle;

  return (
    <div
      className={cn(
        "status-chip flex items-center gap-3 p-3 rounded-xl",
        "animate-slide-up opacity-0",
        `stagger-${Math.min(animationDelay + 1, 8)}`
      )}
      style={{
        backgroundColor: hexToRgba(status.color, 0.15),
        borderLeft: `3px solid ${status.color}`,
        animationFillMode: "forwards",
      }}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      onClick={(e) => {
        // Only trigger click if it wasn't a drag
        if (e.detail === 1) {
          const timeout = setTimeout(() => onClick(), 200);
          // Cancel if drag starts
          const cancel = () => clearTimeout(timeout);
          window.addEventListener("mousemove", cancel, { once: true });
        }
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: hexToRgba(status.color, 0.3) }}
      >
        <Icon size={18} style={{ color: status.color }} />
      </div>
      <span className="font-medium text-surface-100 flex-1 truncate">{status.label}</span>
      <GripVertical size={16} className="text-surface-500 opacity-50 shrink-0" />
    </div>
  );
}

interface QuickScheduleModalProps {
  status: StatusTemplate;
  selectedDate: Date;
  selectedTrackerId: string | null;
  onSchedule: (startTime: Date, endTime: Date) => void;
  onClose: () => void;
}

function QuickScheduleModal({ 
  status, 
  selectedDate, 
  onSchedule, 
  onClose 
}: QuickScheduleModalProps) {
  // Default to next hour
  const now = new Date();
  const nextHour = setMinutes(setHours(startOfDay(selectedDate), now.getHours() + 1), 0);
  
  const [startTime, setStartTime] = useState(nextHour);
  const [endTime, setEndTime] = useState(addHours(nextHour, 1));
  const [customTitle, setCustomTitle] = useState("");

  // Ensure end time is after start time
  useEffect(() => {
    if (endTime <= startTime) {
      setEndTime(addHours(startTime, 1));
    }
  }, [startTime, endTime]);

  const handleSchedule = () => {
    onSchedule(startTime, endTime);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Schedule Activity"
      size="md"
    >
      <div className="space-y-5">
        {/* Status Preview */}
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{
            backgroundColor: hexToRgba(status.color, 0.15),
            borderLeft: `4px solid ${status.color}`,
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: hexToRgba(status.color, 0.3) }}
          >
            <Clock size={20} style={{ color: status.color }} />
          </div>
          <div>
            <h3 className="font-semibold text-surface-100">{status.label}</h3>
            <p className="text-sm text-surface-500">Set the time for this activity</p>
          </div>
        </div>

        {/* Custom Title (optional) */}
        <Input
          label="Custom Title (optional)"
          placeholder={`e.g., "${status.label} with friends"`}
          value={customTitle}
          onChange={(e) => setCustomTitle(e.target.value)}
        />

        {/* Time Pickers */}
        <div className="grid grid-cols-2 gap-4">
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={setStartTime}
          />
          <TimePicker
            label="End Time"
            value={endTime}
            onChange={setEndTime}
            minTime={startTime}
          />
        </div>

        {/* Duration Display */}
        <div className="text-center text-sm text-surface-400">
          Duration: {formatDuration(startTime, endTime)}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleSchedule}
          >
            Schedule
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function formatDuration(start: Date, end: Date): string {
  const diff = end.getTime() - start.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) return `${minutes} minutes`;
  if (minutes === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
  return `${hours}h ${minutes}m`;
}
