"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
}

export function ColorPicker({ value, onChange, presets }: ColorPickerProps) {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [hexInput, setHexInput] = useState(value);
  const [isDraggingSL, setIsDraggingSL] = useState(false);
  const [isDraggingHue, setIsDraggingHue] = useState(false);
  
  const slPickerRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);

  // Convert hex to HSL on mount and when value changes externally
  useEffect(() => {
    const hsl = hexToHSL(value);
    if (hsl) {
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
      setHexInput(value);
    }
  }, [value]);

  // Update hex when HSL changes
  const updateColorFromHSL = useCallback((h: number, s: number, l: number) => {
    const hex = hslToHex(h, s, l);
    setHexInput(hex);
    onChange(hex);
  }, [onChange]);

  // Handle saturation/lightness picker drag
  const handleSLPick = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!slPickerRef.current) return;
    
    const rect = slPickerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    
    const s = (x / rect.width) * 100;
    const l = 100 - (y / rect.height) * 100;
    
    setSaturation(s);
    setLightness(l);
    updateColorFromHSL(hue, s, l);
  }, [hue, updateColorFromHSL]);

  // Handle hue slider drag
  const handleHuePick = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!hueSliderRef.current) return;
    
    const rect = hueSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const h = (x / rect.width) * 360;
    
    setHue(h);
    updateColorFromHSL(h, saturation, lightness);
  }, [saturation, lightness, updateColorFromHSL]);

  // Mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSL) handleSLPick(e);
      if (isDraggingHue) handleHuePick(e);
    };

    const handleMouseUp = () => {
      setIsDraggingSL(false);
      setIsDraggingHue(false);
    };

    if (isDraggingSL || isDraggingHue) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingSL, isDraggingHue, handleSLPick, handleHuePick]);

  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setHexInput(hex);
    
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      const hsl = hexToHSL(hex);
      if (hsl) {
        setHue(hsl.h);
        setSaturation(hsl.s);
        setLightness(hsl.l);
        onChange(hex);
      }
    }
  };

  const defaultPresets = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308",
    "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6",
    "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  ];

  const colorPresets = presets || defaultPresets;

  return (
    <div className="space-y-4">
      {/* Saturation/Lightness Picker */}
      <div
        ref={slPickerRef}
        className="relative w-full h-40 rounded-xl cursor-crosshair overflow-hidden"
        style={{
          background: `
            linear-gradient(to top, #000, transparent),
            linear-gradient(to right, #fff, transparent),
            hsl(${hue}, 100%, 50%)
          `,
        }}
        onMouseDown={(e) => {
          setIsDraggingSL(true);
          handleSLPick(e);
        }}
      >
        {/* Picker indicator */}
        <div
          className="absolute w-5 h-5 border-2 border-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${saturation}%`,
            top: `${100 - lightness}%`,
            backgroundColor: hexInput,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.3)",
          }}
        />
      </div>

      {/* Hue Slider */}
      <div
        ref={hueSliderRef}
        className="relative w-full h-4 rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(to right, 
            hsl(0, 100%, 50%), 
            hsl(60, 100%, 50%), 
            hsl(120, 100%, 50%), 
            hsl(180, 100%, 50%), 
            hsl(240, 100%, 50%), 
            hsl(300, 100%, 50%), 
            hsl(360, 100%, 50%)
          )`,
        }}
        onMouseDown={(e) => {
          setIsDraggingHue(true);
          handleHuePick(e);
        }}
      >
        {/* Hue indicator */}
        <div
          className="absolute w-5 h-5 border-2 border-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2"
          style={{
            left: `${(hue / 360) * 100}%`,
            backgroundColor: `hsl(${hue}, 100%, 50%)`,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.3)",
          }}
        />
      </div>

      {/* Hex Input & Preview */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg border-2 border-surface-600 shrink-0"
          style={{ backgroundColor: hexInput }}
        />
        <div className="flex-1">
          <label className="block text-xs text-surface-500 mb-1">Hex Color</label>
          <input
            type="text"
            value={hexInput}
            onChange={handleHexChange}
            className="w-full px-3 py-1.5 text-sm rounded-lg bg-surface-800/50 border border-surface-700 text-surface-200 font-mono focus:outline-none focus:border-primary-500"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Preset Colors */}
      <div>
        <label className="block text-xs text-surface-500 mb-2">Presets</label>
        <div className="grid grid-cols-6 gap-2">
          {colorPresets.map((color) => (
            <button
              key={color}
              onClick={() => {
                const hsl = hexToHSL(color);
                if (hsl) {
                  setHue(hsl.h);
                  setSaturation(hsl.s);
                  setLightness(hsl.l);
                  setHexInput(color);
                  onChange(color);
                }
              }}
              className={cn(
                "w-8 h-8 rounded-lg transition-all hover:scale-110",
                hexInput.toLowerCase() === color.toLowerCase() && 
                  "ring-2 ring-white ring-offset-2 ring-offset-surface-800"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Utility functions for color conversion
function hexToHSL(hex: string): { h: number; s: number; l: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

