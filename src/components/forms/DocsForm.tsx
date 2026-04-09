"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { DOC_TEMPLATE_DEFS } from "@/data/docs";
import { cn } from "@/lib/utils";
import { CheckSquare, FileText } from "lucide-react";

export default function DocsForm() {
  const selectedIds = useConfigStore((s) => s.config.docs.selectedIds);
  const updateConfig = useConfigStore((s) => s.updateConfig);

  const toggle = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    updateConfig("docs", { selectedIds: next });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Documentation Templates</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select ready-to-use markdown templates for your project's documentation workflow.
        </p>
      </div>

      <div className="text-xs text-muted-foreground">
        {selectedIds.length} template{selectedIds.length !== 1 ? "s" : ""} selected
      </div>

      <div className="grid gap-3">
        {DOC_TEMPLATE_DEFS.map((template) => {
          const selected = selectedIds.includes(template.id);
          return (
            <button
              key={template.id}
              onClick={() => toggle(template.id)}
              className={cn(
                "w-full text-left rounded-lg border p-4 transition-all flex items-start gap-3",
                selected ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/40 hover:bg-muted/20"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
              )}>
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm">{template.label}</span>
                  <code className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">
                    {template.folder}/{template.filename}
                  </code>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{template.description}</p>
              </div>
              <CheckSquare className={cn("w-4 h-4 mt-1 shrink-0", selected ? "text-primary" : "text-muted-foreground/30")} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
