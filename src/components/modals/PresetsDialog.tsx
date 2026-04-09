"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRESETS } from "@/data/presets";
import { useConfigStore } from "@/store/useConfigStore";
import { cn } from "@/lib/utils";
import { Sparkles, Check } from "lucide-react";
import { ConfigState } from "@/types/configSchema";

export function PresetsDialog({ trigger }: { trigger: React.ReactElement }) {
  const [open, setOpen] = useState(false);
  const config = useConfigStore((s) => s.config);
  const importConfig = useConfigStore((s) => s.importConfig);

  const loadPreset = (preset: Partial<ConfigState>) => {
    importConfig({
      ...config,
      ...preset,
      basics: { ...config.basics, ...(preset.basics ?? {}) },
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Starter Presets</DialogTitle>
          <DialogDescription>
            Choose a pre-configured template to jumpstart your project. 
            This will override your current selections in all sections.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 mt-4">
          {PRESETS.map((preset) => (
            <div
              key={preset.id}
              className={cn(
                "flex items-start gap-4 rounded-xl border p-4 hover:bg-muted/30 transition-all cursor-pointer group",
                config.outputPreset === preset.id ? "border-primary bg-primary/5" : ""
              )}
              onClick={() => loadPreset(preset.config as Partial<ConfigState>)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-sm">{preset.label}</span>
                  <Badge className={cn("text-[10px] h-4 px-1.5 border-0", preset.badgeColor)}>
                    {preset.badge}
                  </Badge>
                  {config.outputPreset === preset.id && (
                    <Badge variant="secondary" className="text-[10px] h-4 px-1.5 gap-1 bg-green-500/10 text-green-600 border-0">
                      <Check className="w-2.5 h-2.5" />
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {preset.tagline}
                </p>
              </div>
              <Button
                size="sm"
                variant={config.outputPreset === preset.id ? "secondary" : "outline"}
                className="shrink-0 h-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Sparkles className="w-3 h-3 mr-1.5" />
                Load
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
