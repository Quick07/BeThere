"use client";

import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
  minTime?: Date;
}

export function TimePicker({ value, onChange, label, minTime }: TimePickerProps) {
  const [hours, setHours] = useState(value.getHours());
  const [minutes, setMinutes] = useState(value.getMinutes());
  const [isPM, setIsPM] = useState(value.getHours() >= 12);

  useEffect(() => {
    const h = value.getHours();
    const m = value.getMinutes();
    setHours(h % 12 || 12);
    setMinutes(m);
    setIsPM(h >= 12);
  }, [value]);

  const updateTime = (newHours: number, newMinutes: number, newIsPM: boolean) => {
    let h = newHours % 12;
    if (newIsPM) h += 12;
    if (h === 24) h = 12;
    if (h === 12 && !newIsPM) h = 0;

    const newDate = new Date(value);
    newDate.setHours(h);
    newDate.setMinutes(newMinutes);

    // Check min time constraint
    if (minTime && newDate < minTime) {
      return;
    }

    onChange(newDate);
  };

  const incrementHours = () => {
    const newHours = hours === 12 ? 1 : hours + 1;
    setHours(newHours);
    updateTime(newHours, minutes, isPM);
  };

  const decrementHours = () => {
    const newHours = hours === 1 ? 12 : hours - 1;
    setHours(newHours);
    updateTime(newHours, minutes, isPM);
  };

  const incrementMinutes = () => {
    const newMinutes = (minutes + 15) % 60;
    setMinutes(newMinutes);
    if (newMinutes === 0 && minutes === 45) {
      incrementHours();
    } else {
      updateTime(hours, newMinutes, isPM);
    }
  };

  const decrementMinutes = () => {
    const newMinutes = minutes === 0 ? 45 : minutes - 15;
    setMinutes(newMinutes);
    if (newMinutes === 45 && minutes === 0) {
      decrementHours();
    } else {
      updateTime(hours, newMinutes, isPM);
    }
  };

  const toggleAMPM = () => {
    const newIsPM = !isPM;
    setIsPM(newIsPM);
    updateTime(hours, minutes, newIsPM);
  };

  const handleHoursInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    const newHours = Math.max(1, Math.min(12, val));
    setHours(newHours);
    updateTime(newHours, minutes, isPM);
  };

  const handleMinutesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    const newMinutes = Math.max(0, Math.min(59, val));
    setMinutes(newMinutes);
    updateTime(hours, newMinutes, isPM);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-surface-300 flex items-center gap-2">
          <Clock size={14} />
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <button
            onClick={incrementHours}
            className="p-1 text-surface-400 hover:text-surface-200 hover:bg-surface-700/50 rounded transition-colors"
          >
            <ChevronUp size={18} />
          </button>
          <input
            type="text"
            value={hours.toString().padStart(2, "0")}
            onChange={handleHoursInput}
            className="w-12 text-center text-xl font-semibold bg-surface-800/50 border border-surface-700 rounded-lg py-2 text-surface-100 focus:outline-none focus:border-primary-500"
          />
          <button
            onClick={decrementHours}
            className="p-1 text-surface-400 hover:text-surface-200 hover:bg-surface-700/50 rounded transition-colors"
          >
            <ChevronDown size={18} />
          </button>
        </div>

        <span className="text-2xl font-bold text-surface-400">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <button
            onClick={incrementMinutes}
            className="p-1 text-surface-400 hover:text-surface-200 hover:bg-surface-700/50 rounded transition-colors"
          >
            <ChevronUp size={18} />
          </button>
          <input
            type="text"
            value={minutes.toString().padStart(2, "0")}
            onChange={handleMinutesInput}
            className="w-12 text-center text-xl font-semibold bg-surface-800/50 border border-surface-700 rounded-lg py-2 text-surface-100 focus:outline-none focus:border-primary-500"
          />
          <button
            onClick={decrementMinutes}
            className="p-1 text-surface-400 hover:text-surface-200 hover:bg-surface-700/50 rounded transition-colors"
          >
            <ChevronDown size={18} />
          </button>
        </div>

        {/* AM/PM Toggle */}
        <div className="flex flex-col gap-1 ml-2">
          <button
            onClick={() => {
              if (isPM) toggleAMPM();
            }}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
              !isPM
                ? "bg-primary-500 text-white"
                : "bg-surface-800/50 text-surface-400 hover:text-surface-200"
            )}
          >
            AM
          </button>
          <button
            onClick={() => {
              if (!isPM) toggleAMPM();
            }}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
              isPM
                ? "bg-primary-500 text-white"
                : "bg-surface-800/50 text-surface-400 hover:text-surface-200"
            )}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
}


