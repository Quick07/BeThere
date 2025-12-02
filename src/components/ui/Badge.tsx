"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-surface-700 text-surface-200",
    primary: "bg-primary-500/20 text-primary-300 border border-primary-500/30",
    success: "bg-green-500/20 text-green-300 border border-green-500/30",
    warning: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    danger: "bg-red-500/20 text-red-300 border border-red-500/30",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

