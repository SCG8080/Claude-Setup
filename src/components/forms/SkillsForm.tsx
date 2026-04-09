"use client";

import { useState } from "react";
import { useConfigStore } from "@/store/useConfigStore";
import { SKILL_DEFS } from "@/data/skills";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckSquare, Search } from "lucide-react";

export default function SkillsForm() {
  const selectedIds = useConfigStore((s) => s.config.skills.selectedIds);
  const updateConfig = useConfigStore((s) => s.updateConfig);
  const [query, setQuery] = useState("");

  const toggle = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    updateConfig("skills", { selectedIds: next });
  };

  const filtered = SKILL_DEFS.filter(
    (s) =>
      s.label.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  const categories = Array.from(new Set(filtered.map((s) => s.category)));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Skills Selection</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the workflow skills Claude should be equipped with. Each skill includes step-by-step instructions and output templates.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search skills..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="text-xs text-muted-foreground">
        {selectedIds.length} skill{selectedIds.length !== 1 ? "s" : ""} selected
      </div>

      {categories.map((cat) => (
        <div key={cat} className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{cat}</h3>
          <div className="grid gap-3">
            {filtered
              .filter((s) => s.category === cat)
              .map((skill) => {
                const selected = selectedIds.includes(skill.id);
                return (
                  <button
                    key={skill.id}
                    onClick={() => toggle(skill.id)}
                    className={cn(
                      "w-full text-left rounded-lg border p-4 transition-all hover:shadow-sm",
                      selected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-muted-foreground/40"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{skill.label}</span>
                          <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                            {skill.templateFiles.length} templates
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{skill.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {skill.templateFiles.map((f) => (
                            <code key={f} className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">{f}</code>
                          ))}
                        </div>
                      </div>
                      <div className={cn("w-4 h-4 mt-0.5 shrink-0 rounded-sm", selected ? "text-primary" : "text-muted-foreground/30")}>
                        <CheckSquare className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground text-sm">
          No skills match your search.
        </div>
      )}
    </div>
  );
}
