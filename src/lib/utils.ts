import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, differenceInMinutes, addMinutes, startOfDay, setHours, setMinutes } from "date-fns";

// ============================================================================
// CLASSNAME UTILITIES
// ============================================================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// DATE & TIME UTILITIES
// ============================================================================

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "h:mm a");
}

export function formatTimeRange(start: Date | string, end: Date | string): string {
  return `${formatTime(start)} - ${formatTime(end)}`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "EEEE, MMMM d");
}

export function getHourFromY(y: number, hourHeight: number): number {
  return Math.floor(y / hourHeight);
}

export function getMinuteFromY(y: number, hourHeight: number): number {
  const hour = getHourFromY(y, hourHeight);
  const remainingY = y - hour * hourHeight;
  return Math.round((remainingY / hourHeight) * 60 / 15) * 15; // Snap to 15-minute intervals
}

export function yToTime(y: number, hourHeight: number, baseDate: Date): Date {
  const hour = getHourFromY(y, hourHeight);
  const minute = getMinuteFromY(y, hourHeight);
  return setMinutes(setHours(startOfDay(baseDate), hour), minute);
}

export function timeToY(time: Date, hourHeight: number): number {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  return hours * hourHeight + (minutes / 60) * hourHeight;
}

export function getDurationInMinutes(start: Date | string, end: Date | string): number {
  const startDate = typeof start === "string" ? parseISO(start) : start;
  const endDate = typeof end === "string" ? parseISO(end) : end;
  return differenceInMinutes(endDate, startDate);
}

export function addMinutesToDate(date: Date, minutes: number): Date {
  return addMinutes(date, minutes);
}

// ============================================================================
// ACTIVITY UTILITIES
// ============================================================================

export function isActivityEndingSoon(activity: { endingSoonAt?: Date | null }): boolean {
  if (!activity.endingSoonAt) return false;
  return new Date() < new Date(activity.endingSoonAt);
}

export function getActivityHeight(
  startTime: Date | string,
  endTime: Date | string,
  hourHeight: number
): number {
  const durationMinutes = getDurationInMinutes(startTime, endTime);
  return (durationMinutes / 60) * hourHeight;
}

export function getActivityTop(startTime: Date | string, hourHeight: number): number {
  const start = typeof startTime === "string" ? parseISO(startTime) : startTime;
  return timeToY(start, hourHeight);
}

// ============================================================================
// COLOR UTILITIES
// ============================================================================

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

// ============================================================================
// STRING UTILITIES
// ============================================================================

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural || `${singular}s`;
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
}

export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

// ============================================================================
// ID GENERATION
// ============================================================================

export function generateId(): string {
  return crypto.randomUUID();
}

// ============================================================================
// LOCAL STORAGE UTILITIES
// ============================================================================

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage is full or unavailable
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage unavailable
  }
}

