"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store";

export function NotificationToasts() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

interface ToastProps {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
}

function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const colors = {
    success: "border-green-500/50 bg-green-500/10",
    error: "border-red-500/50 bg-red-500/10",
    info: "border-blue-500/50 bg-blue-500/10",
    warning: "border-amber-500/50 bg-amber-500/10",
  };

  const iconColors = {
    success: "text-green-400",
    error: "text-red-400",
    info: "text-blue-400",
    warning: "text-amber-400",
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border glass shadow-xl",
        "animate-slide-up min-w-[300px] max-w-[400px]",
        colors[type]
      )}
    >
      <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", iconColors[type])} />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-surface-100">{title}</h4>
        {message && (
          <p className="text-sm text-surface-400 mt-0.5">{message}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded text-surface-500 hover:text-surface-300 hover:bg-surface-700/50 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}

