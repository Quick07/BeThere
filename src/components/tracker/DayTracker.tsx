"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, formatTime, yToTime, timeToY, getActivityHeight, getActivityTop } from "@/lib/utils";
import { useActivitiesStore, useUIStore } from "@/store";
import { ActivityBlock } from "@/components/activity/ActivityBlock";
import { HOUR_HEIGHT, HOURS_IN_DAY, DEFAULT_ACTIVITY_DURATION } from "@/lib/constants";
import { addDays, subDays, format, setHours, setMinutes, startOfDay } from "date-fns";

export function DayTracker() {
  const trackerRef = useRef<HTMLDivElement>(null);
  const {
    activities,
    selectedDate,
    setSelectedDate,
    addActivity,
    statusTemplates,
    selectedTrackerId,
  } = useActivitiesStore();
  const { drag, endDrag, updateDrag, openActivityModal } = useUIStore();
  
  const [currentTimeY, setCurrentTimeY] = useState(0);
  const [dropPreview, setDropPreview] = useState<{ y: number; height: number } | null>(null);

  // Filter activities for current tracker
  const trackerActivities = activities.filter(
    (a) => !selectedTrackerId || a.trackerId === selectedTrackerId
  );

  // Update current time indicator
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const y = timeToY(now, HOUR_HEIGHT);
      setCurrentTimeY(y);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Scroll to current time on mount
  useEffect(() => {
    if (trackerRef.current) {
      const now = new Date();
      const scrollTo = Math.max(0, timeToY(now, HOUR_HEIGHT) - 200);
      trackerRef.current.scrollTop = scrollTo;
    }
  }, []);

  // Handle drag over tracker
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!drag.isDragging || !trackerRef.current) return;
      
      const rect = trackerRef.current.getBoundingClientRect();
      const scrollTop = trackerRef.current.scrollTop;
      const y = e.clientY - rect.top + scrollTop;
      
      updateDrag(y);
      
      // Calculate snapped position for preview
      const snappedY = Math.round(y / (HOUR_HEIGHT / 4)) * (HOUR_HEIGHT / 4);
      setDropPreview({
        y: snappedY,
        height: (DEFAULT_ACTIVITY_DURATION / 60) * HOUR_HEIGHT,
      });
    },
    [drag.isDragging, updateDrag]
  );

  // Handle drop
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!drag.isDragging || !drag.draggedStatus || !trackerRef.current) {
        endDrag();
        setDropPreview(null);
        return;
      }

      const rect = trackerRef.current.getBoundingClientRect();
      const scrollTop = trackerRef.current.scrollTop;
      const y = e.clientY - rect.top + scrollTop;

      // Check if drop is within tracker bounds
      if (e.clientX >= rect.left && e.clientX <= rect.right) {
        const startTime = yToTime(y, HOUR_HEIGHT, selectedDate);
        const endTime = new Date(startTime.getTime() + DEFAULT_ACTIVITY_DURATION * 60000);

        const newActivity = {
          id: `activity-${Date.now()}`,
          trackerId: selectedTrackerId || "tracker-1",
          ownerId: "demo-user-1",
          statusTemplateId: drag.draggedStatus.id,
          title: null,
          startTime,
          endTime,
          endingSoonAt: null,
          useGroupDefaultVisibility: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          statusTemplate: drag.draggedStatus,
          participants: [],
        };

        addActivity(newActivity);
      }

      endDrag();
      setDropPreview(null);
    },
    [drag, endDrag, selectedDate, selectedTrackerId, addActivity]
  );

  // Add event listeners for drag
  useEffect(() => {
    if (drag.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [drag.isDragging, handleMouseMove, handleMouseUp]);

  const goToPreviousDay = () => setSelectedDate(subDays(selectedDate, 1));
  const goToNextDay = () => setSelectedDate(addDays(selectedDate, 1));
  const goToToday = () => setSelectedDate(startOfDay(new Date()));

  const isToday = format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Date Navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-800/50">
        <button
          onClick={goToPreviousDay}
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-surface-100">
            {format(selectedDate, "EEEE, MMMM d")}
          </h2>
          {!isToday && (
            <button
              onClick={goToToday}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/20 text-primary-300 hover:bg-primary-500/30 transition-colors"
            >
              Today
            </button>
          )}
        </div>

        <button
          onClick={goToNextDay}
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Time Grid */}
      <div
        ref={trackerRef}
        className={cn(
          "flex-1 overflow-y-auto relative",
          drag.isDragging && "cursor-copy"
        )}
      >
        <div
          className="relative tracker-grid"
          style={{ height: HOURS_IN_DAY * HOUR_HEIGHT }}
        >
          {/* Hour Labels & Lines */}
          {Array.from({ length: HOURS_IN_DAY }, (_, hour) => (
            <div
              key={hour}
              className="absolute left-0 right-0 border-b border-surface-800/30"
              style={{ top: hour * HOUR_HEIGHT, height: HOUR_HEIGHT }}
            >
              <span className="absolute left-4 -top-3 text-xs text-surface-500 bg-surface-900 px-1">
                {formatTime(setMinutes(setHours(selectedDate, hour), 0))}
              </span>
            </div>
          ))}

          {/* Current Time Indicator */}
          {isToday && (
            <div
              className="absolute left-0 right-0 z-20 pointer-events-none"
              style={{ top: currentTimeY }}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary-500 -ml-1.5" />
                <div className="flex-1 h-0.5 bg-primary-500" />
              </div>
            </div>
          )}

          {/* Drop Preview */}
          {dropPreview && drag.draggedStatus && (
            <div
              className="absolute left-16 right-4 rounded-xl border-2 border-dashed border-primary-500/50 bg-primary-500/10 pointer-events-none z-10"
              style={{
                top: dropPreview.y,
                height: dropPreview.height,
              }}
            >
              <div className="p-2 text-sm text-primary-300 font-medium">
                {drag.draggedStatus.label}
              </div>
            </div>
          )}

          {/* Activity Blocks */}
          <div className="absolute left-16 right-4 top-0 bottom-0">
            {trackerActivities.map((activity) => (
              <ActivityBlock
                key={activity.id}
                activity={activity}
                hourHeight={HOUR_HEIGHT}
                onClick={() => openActivityModal(activity)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

