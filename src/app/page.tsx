"use client";

import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import ProjectBasicsForm from "@/components/forms/ProjectBasicsForm";
import ClaudeCoreForm from "@/components/forms/ClaudeCoreForm";
import SkillsForm from "@/components/forms/SkillsForm";
import SubagentsForm from "@/components/forms/SubagentsForm";
import RulesForm from "@/components/forms/RulesForm";
import HooksForm from "@/components/forms/HooksForm";
import DocsForm from "@/components/forms/DocsForm";
import ObsidianForm from "@/components/forms/ObsidianForm";
import OutputForm from "@/components/forms/OutputForm";
import FileTreePreview from "@/components/preview/FileTreePreview";
import MarkdownPreview from "@/components/preview/MarkdownPreview";
import ZipManifest from "@/components/preview/ZipManifest";
import { useConfigStore } from "@/store/useConfigStore";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const activeTab = useConfigStore((s) => s.ui.activeTab);
  const [previewTab, setPreviewTab] = useState<"tree" | "markdown" | "manifest">("tree");

  const renderForm = () => {
    switch (activeTab) {
      case "basics": return <ProjectBasicsForm />;
      case "core": return <ClaudeCoreForm />;
      case "skills": return <SkillsForm />;
      case "subagents": return <SubagentsForm />;
      case "rules": return <RulesForm />;
      case "hooks": return <HooksForm />;
      case "docs": return <DocsForm />;
      case "obsidian": return <ObsidianForm />;
      case "output": return <OutputForm />;
      default: return <ProjectBasicsForm />;
    }
  };

  const previewTabs = [
    { id: "tree", label: "File Tree" },
    { id: "markdown", label: "Markdown Preview" },
    { id: "manifest", label: "Zip Manifest" },
  ] as const;

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex flex-1 overflow-hidden">
          {/* Center: Multi-step form */}
          <div className="flex-1 min-w-[360px] flex flex-col border-r bg-background overflow-y-auto">
            <div className="p-8 max-w-2xl mx-auto w-full pb-16">
              {renderForm()}
            </div>
          </div>

          {/* Right: Live preview panel */}
          <div className="hidden xl:flex w-[400px] shrink-0 flex-col bg-muted/10 overflow-hidden">
            <div className="border-b px-4 py-2 bg-background flex items-center gap-1">
              {previewTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPreviewTab(tab.id)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                    previewTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {previewTab === "tree" && <FileTreePreview />}
              {previewTab === "markdown" && <MarkdownPreview />}
              {previewTab === "manifest" && <ZipManifest />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
