"use client";

import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  imageUrl?: string | null;
  size?: "xs" | "sm" | "md" | "lg";
  isOnline?: boolean;
  className?: string;
}

export function Avatar({
  name,
  imageUrl,
  size = "md",
  isOnline,
  className,
}: AvatarProps) {
  const sizes = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const onlineIndicatorSizes = {
    xs: "w-2 h-2 border",
    sm: "w-2.5 h-2.5 border-2",
    md: "w-3 h-3 border-2",
    lg: "w-3.5 h-3.5 border-2",
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-medium",
          "bg-gradient-to-br from-primary-500 to-accent-500 text-white",
          sizes[size]
        )}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
      {isOnline !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-surface-900",
            isOnline ? "bg-green-500" : "bg-surface-500",
            isOnline && "online-pulse",
            onlineIndicatorSizes[size]
          )}
        />
      )}
    </div>
  );
}

