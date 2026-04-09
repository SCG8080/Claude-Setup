"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { SUBAGENT_DEFS } from "@/data/subagents";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Bot, CheckSquare } from "lucide-react";

export default function SubagentsForm() {
  const selectedIds = useConfigStore((s) => s.config.subagents.selectedIds);
  const updateConfig = useConfigStore((s) => s.updateConfig);

  const toggle = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    updateConfig("subagents", { selectedIds: next });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Subagents</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select specialized AI subagents to delegate focused tasks. Each has a defined role, allowed tools, and system prompt.
        </p>
      </div>

      <div className="text-xs text-muted-foreground">
        {selectedIds.length} subagent{selectedIds.length !== 1 ? "s" : ""} selected
      </div>

      <div className="grid gap-4">
        {SUBAGENT_DEFS.map((agent) => {
          const selected = selectedIds.includes(agent.id);
          return (
            <button
              key={agent.id}
              onClick={() => toggle(agent.id)}
              className={cn(
                "w-full text-left rounded-xl border p-5 transition-all hover:shadow-sm",
                selected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-muted-foreground/40"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                    selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{agent.label}</span>
                      <Badge variant="outline" className="text-[10px] h-4 px-1.5">{agent.role}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{agent.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {agent.toolScope.map((tool) => (
                        <span key={tool} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <CheckSquare className={cn("w-4 h-4 mt-0.5 shrink-0", selected ? "text-primary" : "text-muted-foreground/30")} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
