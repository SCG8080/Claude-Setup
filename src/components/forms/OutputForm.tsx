"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { PRESETS } from "@/data/presets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { ConfigState } from "@/types/configSchema";

export default function OutputForm() {
  const config = useConfigStore((s) => s.config);
  const importConfig = useConfigStore((s) => s.importConfig);

  const loadPreset = (preset: Partial<ConfigState>) => {
    importConfig({
      ...config,
      ...preset,
      basics: { ...config.basics, ...(preset.basics ?? {}) },
    });
  };


  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Output Configuration</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose an output mode preset or load a full starter bundle to override your current selections.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Starter Bundles</h3>
        <p className="text-xs text-muted-foreground">Loading a preset will override your current form state with optimised defaults.</p>
        <div className="grid gap-4">
          {PRESETS.map((preset) => (
            <div
              key={preset.id}
              className="flex items-start gap-4 rounded-xl border p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-sm">{preset.label}</span>
                  <Badge className={cn("text-[10px] h-4 px-1.5 border-0", preset.badgeColor)}>
                    {preset.badge}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{preset.tagline}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="shrink-0 h-8 text-xs"
                onClick={() => loadPreset(preset.config as Partial<ConfigState>)}
              >
                <Sparkles className="w-3 h-3 mr-1.5" />
                Load
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
