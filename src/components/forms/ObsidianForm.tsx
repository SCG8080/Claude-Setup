"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckSquare } from "lucide-react";

const TAXONOMIES = [
  { id: "system", label: "System" },
  { id: "module", label: "Module" },
  { id: "feature", label: "Feature" },
  { id: "screen", label: "Screen" },
  { id: "api", label: "API" },
  { id: "entity", label: "Entity" },
  { id: "decision", label: "Decision" },
  { id: "bug", label: "Bug" },
  { id: "refactor", label: "Refactor" },
  { id: "test", label: "Test" },
];

export default function ObsidianForm() {
  const config = useConfigStore((s) => s.config.obsidian);
  const updateConfig = useConfigStore((s) => s.updateConfig);

  const update = (changes: Partial<typeof config>) => updateConfig("obsidian", changes);

  const toggleTaxonomy = (id: string) => {
    const next = config.noteTaxonomy.includes(id)
      ? config.noteTaxonomy.filter((x) => x !== id)
      : [...config.noteTaxonomy, id];
    update({ noteTaxonomy: next });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Obsidian Vault Setup</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Generate a structured Obsidian knowledge graph vault for your codebase — with typed notes, graph metadata, and templates.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-xl border p-4 bg-amber-50 border-amber-200">
        <div className="space-y-0.5">
          <Label className="font-semibold">Include Obsidian Vault</Label>
          <p className="text-xs text-muted-foreground">Adds an <code className="font-mono">obsidian-vault/</code> folder to the output zip.</p>
        </div>
        <Switch checked={config.includeVault} onCheckedChange={(c) => update({ includeVault: c })} />
      </div>

      <div className={cn("space-y-4 transition-opacity", !config.includeVault && "opacity-40 pointer-events-none")}>
        {[
          { key: "includeTypedFolders", label: "Typed Folders", desc: "Organize notes by type: Systems, Modules, Features, APIs..." },
          { key: "includeTemplateNotes", label: "Note Templates", desc: "Starter frontmatter templates for each note type." },
          { key: "includeGraphMeta", label: "Graph Metadata", desc: "YAML frontmatter with tags and wiki-links for Obsidian graph." },
          { key: "includeCanvasStarter", label: "Canvas Starter Map", desc: "A top-level canvas file linking major system areas." },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>{label}</Label>
              <p className="text-[0.8rem] text-muted-foreground">{desc}</p>
            </div>
            <Switch
              checked={(config as any)[key]}
              onCheckedChange={(c) => update({ [key]: c } as any)}
            />
          </div>
        ))}

        <Separator />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Note Taxonomy</h3>
          <p className="text-xs text-muted-foreground">Choose which note types to scaffold. Each generates a folder and template.</p>
          <div className="grid grid-cols-2 gap-2">
            {TAXONOMIES.map((tax) => {
              const selected = config.noteTaxonomy.includes(tax.id);
              return (
                <button
                  key={tax.id}
                  onClick={() => toggleTaxonomy(tax.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors",
                    selected ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-muted-foreground/40"
                  )}
                >
                  <CheckSquare className={cn("w-3.5 h-3.5", !selected && "text-muted-foreground/30")} />
                  {tax.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
