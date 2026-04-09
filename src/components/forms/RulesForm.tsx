"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { RULE_DEFS } from "@/data/rules";
import { cn } from "@/lib/utils";
import { CheckSquare, ShieldCheck } from "lucide-react";

export default function RulesForm() {
  const selectedIds = useConfigStore((s) => s.config.rules.selectedIds);
  const updateConfig = useConfigStore((s) => s.updateConfig);

  const toggle = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    updateConfig("rules", { selectedIds: next });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Rules Setup</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select rule files to include in <code className="text-primary font-mono text-xs">.claude/rules/</code>. Each is a focused markdown file Claude reads before editing related files.
        </p>
      </div>

      <div className="text-xs text-muted-foreground">
        {selectedIds.length} rule file{selectedIds.length !== 1 ? "s" : ""} selected
      </div>

      <div className="grid gap-3">
        {RULE_DEFS.map((rule) => {
          const selected = selectedIds.includes(rule.id);
          return (
            <button
              key={rule.id}
              onClick={() => toggle(rule.id)}
              className={cn(
                "w-full text-left rounded-lg border p-4 transition-all flex items-start gap-3",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/40 hover:bg-muted/20"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
              )}>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm">{rule.label}</span>
                  <code className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">
                    .claude/rules/{rule.filename}
                  </code>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rule.description}</p>
              </div>
              <CheckSquare className={cn("w-4 h-4 mt-1 shrink-0", selected ? "text-primary" : "text-muted-foreground/30")} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
