"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { Button } from "@/components/ui/button";
import { 
  FolderGit2, 
  Settings, 
  Wrench, 
  Bot, 
  ShieldCheck, 
  GitCommitHorizontal,
  FileText,
  Boxes,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "basics", icon: FolderGit2, label: "Project Basics" },
  { id: "core", icon: Settings, label: "Claude Core" },
  { id: "skills", icon: Wrench, label: "Skills Selection" },
  { id: "subagents", icon: Bot, label: "Subagents" },
  { id: "rules", icon: ShieldCheck, label: "Rules Setup" },
  { id: "hooks", icon: GitCommitHorizontal, label: "Git Hooks" },
  { id: "docs", icon: FileText, label: "Doc Templates" },
  { id: "obsidian", icon: Boxes, label: "Obsidian Vault" },
  { id: "output", icon: Palette, label: "Output Config" },
];

export default function Sidebar() {
  const activeTab = useConfigStore((s) => s.ui.activeTab);
  const setActiveTab = useConfigStore((s) => s.setActiveTab);

  return (
    <aside className="w-64 border-r bg-muted/30 hidden md:flex flex-col shrink-0">
      <div className="flex-1 py-6 px-4">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
          Configuration Steps
        </h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                activeTab === item.id 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4", activeTab === item.id ? "text-primary" : "text-muted-foreground")} />
              {item.label}
              {/* Fake Completion Indicators */}
              {item.id === "basics" && <div className="ml-auto w-2 h-2 rounded-full bg-green-500" />}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="rounded-lg bg-card border shadow-sm p-4 text-sm">
          <h3 className="font-medium mb-1">Recommended Setup</h3>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Need inspiration? Try loading a preset template.
          </p>
          <Button variant="secondary" size="sm" className="w-full text-xs h-8">
            Browse Presets
          </Button>
        </div>
      </div>
    </aside>
  );
}
