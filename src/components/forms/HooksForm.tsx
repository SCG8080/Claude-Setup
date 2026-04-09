"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { HOOK_DEFS } from "@/data/hooks";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckSquare, GitCommitHorizontal } from "lucide-react";

export default function HooksForm() {
  const selectedIds = useConfigStore((s) => s.config.hooks.selectedIds);
  const updateConfig = useConfigStore((s) => s.updateConfig);

  const toggle = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    updateConfig("hooks", { selectedIds: next });
  };

  const preHooks = HOOK_DEFS.filter((h) => h.event === "PreToolUse");
  const postHooks = HOOK_DEFS.filter((h) => h.event === "PostToolUse");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Git Hooks</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Claude hooks are shell scripts that run automatically on tool use events. <strong>PreToolUse</strong> hooks can block actions; <strong>PostToolUse</strong> hooks run after.
        </p>
      </div>

      <div className="text-xs text-muted-foreground">
        {selectedIds.length} hook{selectedIds.length !== 1 ? "s" : ""} selected
      </div>

      {[
        { label: "Before Tool Use (Blocking)", hooks: preHooks, eventColor: "bg-red-100 text-red-700" },
        { label: "After Tool Use (Side Effects)", hooks: postHooks, eventColor: "bg-green-100 text-green-700" },
      ].map(({ label, hooks, eventColor }) => (
        <div key={label} className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</h3>
          <div className="grid gap-3">
            {hooks.map((hook) => {
              const selected = selectedIds.includes(hook.id);
              return (
                <button
                  key={hook.id}
                  onClick={() => toggle(hook.id)}
                  className={cn(
                    "w-full text-left rounded-lg border p-4 transition-all flex items-start gap-3",
                    selected ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/40 hover:bg-muted/20"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                    selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    <GitCommitHorizontal className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{hook.label}</span>
                      <Badge className={cn("text-[10px] h-4 px-1.5 border-0", eventColor)}>
                        {hook.event}
                      </Badge>
                      <code className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {hook.filename}
                      </code>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{hook.description}</p>
                  </div>
                  <CheckSquare className={cn("w-4 h-4 mt-1 shrink-0", selected ? "text-primary" : "text-muted-foreground/30")} />
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
