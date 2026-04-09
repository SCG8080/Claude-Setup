"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export default function ClaudeCoreForm() {
  const config = useConfigStore((s) => s.config.core);
  const updateConfig = useConfigStore((s) => s.updateConfig);

  const update = (changes: Partial<typeof config>) => {
    updateConfig("core", changes);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Claude Core Setup</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure the essential AI behavior and operational boundaries.
        </p>
      </div>

      <div className="space-y-6 pt-4">
        <div className="grid gap-4">
          <h3 className="font-medium text-sm">Included Files</h3>
          
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>Include CLAUDE.md</Label>
          <p className="text-[0.8rem] text-muted-foreground">The foundational AI system prompt for this project.</p>
            </div>
            <Switch checked={config.includeClaudeMd} onCheckedChange={(c) => update({ includeClaudeMd: c })} />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>Include AGENTS.md</Label>
              <p className="text-[0.8rem] text-muted-foreground">Subagent router definition and directory.</p>
            </div>
            <Switch checked={config.includeAgentsMd} onCheckedChange={(c) => update({ includeAgentsMd: c })} />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>Include .claude directory</Label>
              <p className="text-[0.8rem] text-muted-foreground">Settings, rules, and skills base folder.</p>
            </div>
            <Switch checked={config.includeSettingsJson} onCheckedChange={(c) => update({ includeSettingsJson: c })} />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium text-sm">Security Strictness</h3>
          <RadioGroup 
            value={config.securityStrictness} 
            onValueChange={(val: any) => update({ securityStrictness: val })}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { id: "low", label: "Low", desc: "For public non-sensitive repos" },
              { id: "medium", label: "Medium", desc: "Standard protections" },
              { id: "high", label: "High", desc: "Strict secrets blocking" }
            ].map(lvl => (
              <Label 
                key={lvl.id}
                htmlFor={`sec-${lvl.id}`}
                className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary`}
              >
                <RadioGroupItem value={lvl.id} id={`sec-${lvl.id}`} className="sr-only" />
                <span className="font-semibold mb-1">{lvl.label}</span>
                <span className="text-xs text-muted-foreground text-center">{lvl.desc}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium text-sm">Editing Posture</h3>
          <RadioGroup 
            value={config.editingPosture} 
            onValueChange={(val: any) => update({ editingPosture: val })}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              { id: "read-first", label: "Read First", desc: "Prioritizes understanding context over modifying code." },
              { id: "plan-first", label: "Plan First", desc: "Generates step-by-step plans before execution." },
              { id: "small-batch", label: "Small Batch", desc: "Makes micro-changes iteratively to verify tests." },
              { id: "aggressive", label: "Aggressive", desc: "Rapidly generates and modifies files in bulk." }
            ].map(lvl => (
              <Label 
                key={lvl.id}
                htmlFor={`ep-${lvl.id}`}
                className={`flex flex-col items-start justify-start rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-semibold">{lvl.label}</span>
                  <RadioGroupItem value={lvl.id} id={`ep-${lvl.id}`} />
                </div>
                <span className="text-xs text-muted-foreground">{lvl.desc}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
