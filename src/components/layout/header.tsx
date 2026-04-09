"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { Button } from "@/components/ui/button";
import { DownloadCloud, FileJson, Copy, Settings2, Check } from "lucide-react";
import { generateAndDownloadZip } from "@/lib/zipBuilder";
import { generateClaudeMd } from "@/lib/generator";
import { useState } from "react";

export default function Header() {
  const config = useConfigStore((s) => s.config);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generateAndDownloadZip(config);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyClaudeMd = () => {
    const content = generateClaudeMd(config);
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.basics.projectName.replace(/\s+/g, "-").toLowerCase()}-claude-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b bg-background/95 backdrop-blur shrink-0 z-10 sticky top-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
          <Settings2 className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-sm text-foreground leading-tight">Claude SDLC Config Generator</h1>
          <p className="text-[10px] text-muted-foreground leading-tight">{config.basics.projectName || "Untitled Project"}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="hidden sm:flex h-8 text-xs" onClick={handleExportJson}>
          <FileJson className="w-3.5 h-3.5 mr-1.5" />
          Export JSON
        </Button>
        <Button variant="ghost" size="sm" className="hidden sm:flex h-8 text-xs" onClick={handleCopyClaudeMd}>
          {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
          {copied ? "Copied!" : "Copy CLAUDE.md"}
        </Button>
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-8 text-xs transition-all active:scale-95"
          onClick={handleDownload}
          disabled={downloading}
        >
          <DownloadCloud className="w-3.5 h-3.5 mr-1.5" />
          {downloading ? "Generating..." : "Download .zip"}
        </Button>
      </div>
    </header>
  );
}
