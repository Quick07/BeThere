"use client";

import { useMemo } from "react";
import { Clock, Users } from "lucide-react";
import { cn, formatTimeRange, hexToRgba, getContrastColor, getActivityTop, getActivityHeight } from "@/lib/utils";
import type { Activity } from "@/types";

interface ActivityBlockProps {
  activity: Activity;
  hourHeight: number;
  onClick: () => void;
}

export function ActivityBlock({ activity, hourHeight, onClick }: ActivityBlockProps) {
  const { statusTemplate, participants, endingSoonAt, startTime, endTime, title } =
    activity;

  const isEndingSoon = useMemo(() => {
    if (!endingSoonAt) return false;
    return new Date() < new Date(endingSoonAt);
  }, [endingSoonAt]);

  const top = getActivityTop(startTime, hourHeight);
  const height = Math.max(getActivityHeight(startTime, endTime, hourHeight), 40);
  
  const color = statusTemplate?.color || "#3b82f6";
  const label = title || statusTemplate?.label || "Activity";
  const participantCount = (participants?.length || 0) + 1; // +1 for owner

  const backgroundColor = hexToRgba(color, 0.85);
  const textColor = getContrastColor(color);

  return (
    <div
      onClick={onClick}
      className={cn(
        "absolute left-0 right-0 rounded-xl cursor-pointer",
        "transition-all duration-200 hover:scale-[1.02] hover:z-10",
        "shadow-lg hover:shadow-xl",
        isEndingSoon && "activity-ending-soon"
      )}
      style={{
        top,
        height,
        backgroundColor,
      }}
    >
      {/* Content */}
      <div
        className="h-full p-3 flex flex-col justify-between overflow-hidden"
        style={{ color: textColor }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">{label}</h4>
            <p className="text-xs opacity-80 mt-0.5">
              {formatTimeRange(startTime, endTime)}
            </p>
          </div>

          {/* Ending Soon Badge */}
          {isEndingSoon && (
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                backgroundColor: hexToRgba("#000", 0.2),
              }}
            >
              <Clock size={10} />
              <span>5m</span>
            </div>
          )}
        </div>

        {/* Participants */}
        {height >= 60 && participantCount > 0 && (
          <div className="flex items-center gap-1.5 mt-auto">
            <Users size={12} className="opacity-80" />
            <span className="text-xs font-medium">
              You {participantCount > 1 && `+ ${participantCount - 1}`}
            </span>
          </div>
        )}
      </div>

      {/* Resize Handle (visual only for now) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize rounded-b-xl"
        style={{ backgroundColor: hexToRgba("#000", 0.1) }}
      />
    </div>
  );
}

