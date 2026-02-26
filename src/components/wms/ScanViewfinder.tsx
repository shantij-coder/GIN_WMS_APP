import { useState, useEffect } from "react";
import { Keyboard } from "lucide-react";

interface ScanViewfinderProps {
  mode?: "icode" | "batch" | "set";
  onScan: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

// Brand colours from the requirement
const G = {
  green:    "#4CBB47",
  greenDk:  "#2D8A36",
  
  modeIcode:  { bg: "#E8F8E8", hdr: "#4CBB47", hdrDk: "#2D8A36", text: "#1A5C1A", ring: "#4CBB47" },
  modeBatch:  { bg: "#EAF0FF", hdr: "#3B6FE0", hdrDk: "#1E40AF", text: "#1E3A8A", ring: "#3B6FE0" },
  modeSet:    { bg: "#F3EEFF", hdr: "#7C3AED", hdrDk: "#5B21B6", text: "#4C1D95", ring: "#7C3AED" },
  
  n500: "#6B7280",
};

const ScanViewfinder = ({ mode = "icode", onScan, placeholder, className = "", label }: ScanViewfinderProps) => {
  const [value, setValue] = useState("");
  
  const colours = mode === "icode" ? G.modeIcode : mode === "batch" ? G.modeBatch : G.modeSet;
  const modeLabel = label || (mode === "icode" ? "ICODE / Barcode" : mode === "batch" ? "Batch / Serial No." : "Set Item");
  const defaultPlaceholder = mode === "icode" ? "BIN-A-04-R3" : mode === "batch" ? "BATCH-2024-001" : "SET-ITEM-001";
  const finalPlaceholder = placeholder || defaultPlaceholder;

  const handleScan = () => {
    if (value.trim()) {
      onScan(value.trim());
      setValue("");
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {/* Viewfinder box */}
      <div 
        className="relative flex h-48 items-center justify-center overflow-hidden rounded-t-2xl bg-[#0D1117]"
        style={{
          border: `2px solid ${colours.ring}`,
          borderBottom: "none",
          boxShadow: `inset 0 0 40px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }} 
        />

        {/* Corner brackets */}
        <div className="absolute left-4 top-4 h-6 w-6 rounded-sm border-l-[3px] border-t-[3px]" style={{ borderColor: colours.ring }} />
        <div className="absolute right-4 top-4 h-6 w-6 rounded-sm border-r-[3px] border-t-[3px]" style={{ borderColor: colours.ring }} />
        <div className="absolute bottom-4 left-4 h-6 w-6 rounded-sm border-b-[3px] border-l-[3px]" style={{ borderColor: colours.ring }} />
        <div className="absolute bottom-4 right-4 h-6 w-6 rounded-sm border-b-[3px] border-r-[3px]" style={{ borderColor: colours.ring }} />

        {/* Animated scan line */}
        <div 
          className="absolute left-[10%] right-[10%] h-0.5 animate-scan-line"
          style={{
            background: `linear-gradient(90deg, transparent, ${colours.ring}, transparent)`,
            boxShadow: `0 0 8px ${colours.ring}`,
          }} 
        />

        {/* Center content */}
        <div className="z-10 text-center">
          <div className="mb-1.5 text-4xl opacity-90 text-white">
            {mode === "icode" ? "▦" : mode === "batch" ? "≡" : "⊞"}
          </div>
          <div 
            className="text-[11px] font-bold uppercase tracking-[1.5px]"
            style={{ color: colours.ring }}
          >
            {modeLabel}
          </div>
          <div className="mt-1 text-[10px] text-white/45">
            Viewfinder Active
          </div>
        </div>
      </div>

      {/* Simulate scan input */}
      <div 
        className="flex items-center gap-3 rounded-b-2xl border-[1.5px] border-t-0 p-3 shadow-sm transition-all focus-within:shadow-md"
        style={{
          background: colours.bg,
          borderColor: colours.ring,
        }}
      >
        <Keyboard className="h-5 w-5 shrink-0 opacity-70" style={{ color: colours.text }} />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleScan()}
          placeholder={`Type to simulate scan: ${finalPlaceholder}`}
          className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/60"
          style={{ color: colours.text, fontFamily: "inherit" }}
        />
        <button 
          onClick={handleScan}
          className="rounded-lg px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:opacity-90 hover:shadow active:scale-95"
          style={{ background: colours.ring }}
        >
          SCAN
        </button>
      </div>
    </div>
  );
};

export default ScanViewfinder;
