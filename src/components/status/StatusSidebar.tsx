"use client";

import { useState } from "react";
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
  type LucideIcon,
} from "lucide-react";
import { cn, hexToRgba } from "@/lib/utils";
import { Button, Modal, Input } from "@/components/ui";
import { useActivitiesStore, useUIStore } from "@/store";
import type { StatusTemplate } from "@/types";

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
  const { statusTemplates, addStatusTemplate } = useActivitiesStore();
  const { startDrag } = useUIStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newStatusLabel, setNewStatusLabel] = useState("");
  const [newStatusColor, setNewStatusColor] = useState("#3b82f6");

  const handleDragStart = (
    e: React.MouseEvent | React.TouchEvent,
    status: StatusTemplate
  ) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startDrag(status, clientY);
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

  return (
    <aside className="w-64 h-full border-r border-surface-800/50 glass flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-surface-800/50">
        <h2 className="text-lg font-semibold text-surface-100 mb-1">Statuses</h2>
        <p className="text-xs text-surface-500">Drag to schedule an activity</p>
      </div>

      {/* Status List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {statusTemplates.map((status, index) => (
          <StatusChip
            key={status.id}
            status={status}
            onDragStart={(e) => handleDragStart(e, status)}
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
            <div className="flex gap-2 flex-wrap">
              {[
                "#ef4444",
                "#f59e0b",
                "#22c55e",
                "#06b6d4",
                "#3b82f6",
                "#8b5cf6",
                "#ec4899",
                "#6b7280",
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => setNewStatusColor(color)}
                  className={cn(
                    "w-8 h-8 rounded-lg transition-all",
                    newStatusColor === color && "ring-2 ring-white ring-offset-2 ring-offset-surface-800"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
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
    </aside>
  );
}

interface StatusChipProps {
  status: StatusTemplate;
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  animationDelay: number;
}

function StatusChip({ status, onDragStart, animationDelay }: StatusChipProps) {
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
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: hexToRgba(status.color, 0.3) }}
      >
        <Icon size={18} style={{ color: status.color }} />
      </div>
      <span className="font-medium text-surface-100 flex-1">{status.label}</span>
      <GripVertical size={16} className="text-surface-500 opacity-50" />
    </div>
  );
}

