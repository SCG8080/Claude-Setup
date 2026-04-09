"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { SKILL_DEFS } from "@/data/skills";
import { SUBAGENT_DEFS } from "@/data/subagents";
import { RULE_DEFS } from "@/data/rules";
import { HOOK_DEFS } from "@/data/hooks";
import { DOC_TEMPLATE_DEFS } from "@/data/docs";
import { buildFileTree, flattenTree, FileNode } from "@/lib/generator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function MarkdownPreview() {
  const config = useConfigStore((s) => s.config);
  const [selectedFile, setSelectedFile] = useState<string>("CLAUDE.md");
  const [copied, setCopied] = useState(false);

  const selectedDefs = {
    skillDefs: SKILL_DEFS.filter((s) => config.skills.selectedIds.includes(s.id)),
    subagentDefs: SUBAGENT_DEFS.filter((s) => config.subagents.selectedIds.includes(s.id)),
    ruleDefs: RULE_DEFS.filter((s) => config.rules.selectedIds.includes(s.id)),
    hookDefs: HOOK_DEFS.filter((s) => config.hooks.selectedIds.includes(s.id)),
    docDefs: DOC_TEMPLATE_DEFS.filter((s) => config.docs.selectedIds.includes(s.id)),
  };

  const tree = buildFileTree(config, selectedDefs);
  const allFiles = flattenTree(tree);
  const textFiles = allFiles.filter((f) =>
    f.name.endsWith(".md") || f.name.endsWith(".json") || f.name.endsWith(".sh") || f.name.endsWith(".canvas")
  );

  const activeFile = textFiles.find((f) => f.path === selectedFile) ?? textFiles[0];

  const handleCopy = () => {
    if (activeFile?.content) {
      navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border bg-background shadow-sm flex flex-col h-full overflow-hidden">
      {/* File tabs */}
      <div className="border-b px-3 py-2 flex items-center gap-2 overflow-x-auto flex-shrink-0 bg-muted/20">
        {textFiles.slice(0, 8).map((file) => (
          <button
            key={file.path}
            onClick={() => setSelectedFile(file.path)}
            className={`text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap transition-colors ${
              selectedFile === file.path
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-background">
        <code className="text-xs text-muted-foreground">{activeFile?.path ?? "—"}</code>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={handleCopy}>
          {copied ? <Check className="w-3 h-3 mr-1 text-green-500" /> : <Copy className="w-3 h-3 mr-1" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeFile ? (
          <pre className="text-xs font-mono text-foreground whitespace-pre-wrap leading-relaxed">
            {activeFile.content}
          </pre>
        ) : (
          <div className="text-center py-8 text-sm text-muted-foreground">
            No files to preview. Select options on the left.
          </div>
        )}
      </div>
    </div>
  );
}
