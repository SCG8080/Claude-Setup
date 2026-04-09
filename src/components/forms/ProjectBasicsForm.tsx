"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProjectBasicsForm() {
  const config = useConfigStore((s) => s.config.basics);
  const updateConfig = useConfigStore((s) => s.updateConfig);

  const update = (changes: Partial<typeof config>) => {
    updateConfig("basics", changes);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Project Basics</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Define the core attributes of your codebase to tailor the generated setup.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <div className="grid gap-2">
          <Label htmlFor="projectName">Project Name <span className="text-destructive">*</span></Label>
          <Input 
            id="projectName"
            value={config.projectName}
            onChange={(e) => update({ projectName: e.target.value })}
            placeholder="e.g. acme-web-app"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea 
            id="description"
            value={config.description}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="What does this project do?"
            className="resize-none h-20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Repository Type</Label>
            <Select 
              value={config.repoType} 
              onValueChange={(val: any) => update({ repoType: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend Only</SelectItem>
                <SelectItem value="backend">Backend Only</SelectItem>
                <SelectItem value="fullstack">Fullstack</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="monorepo">Monorepo</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Workflow Goal</Label>
            <Select 
              value={config.workflowGoal} 
              onValueChange={(val: any) => update({ workflowGoal: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Project</SelectItem>
                <SelectItem value="reverse">Reverse Engineer</SelectItem>
                <SelectItem value="refactor">Modernize / Refactor</SelectItem>
                <SelectItem value="both">New + Reverse Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Package Manager</Label>
            <Select 
              value={config.packageManager} 
              onValueChange={(val: any) => update({ packageManager: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="npm">npm</SelectItem>
                <SelectItem value="yarn">Yarn</SelectItem>
                <SelectItem value="pnpm">pnpm</SelectItem>
                <SelectItem value="bun">Bun</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="testingStack">Testing Stack (Optional)</Label>
            <Input 
              id="testingStack"
              value={config.testingStack}
              onChange={(e) => update({ testingStack: e.target.value })}
              placeholder="e.g. Jest, Cypress, Playwright"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
