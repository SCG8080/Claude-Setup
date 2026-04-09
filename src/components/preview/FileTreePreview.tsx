"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { SKILL_DEFS } from "@/data/skills";
import { SUBAGENT_DEFS } from "@/data/subagents";
import { RULE_DEFS } from "@/data/rules";
import { HOOK_DEFS } from "@/data/hooks";
import { DOC_TEMPLATE_DEFS } from "@/data/docs";
import { buildFileTree, FileNode } from "@/lib/generator";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, File } from "lucide-react";

function TreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);

  const isFolder = node.type === "folder";
  const Icon = isFolder
    ? open ? FolderOpen : Folder
    : node.name.endsWith(".md") ? FileText : File;

  return (
    <div>
      <button
        onClick={() => isFolder && setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 w-full text-left py-0.5 px-1 rounded text-sm hover:bg-muted/50 transition-colors",
          isFolder ? "font-medium" : "text-muted-foreground font-mono text-xs"
        )}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
      >
        {isFolder && (
          open
            ? <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
            : <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
        )}
        <Icon className={cn("w-3.5 h-3.5 shrink-0", isFolder ? "text-amber-500" : node.name.endsWith(".md") ? "text-blue-500" : node.name.endsWith(".json") ? "text-green-500" : node.name.endsWith(".sh") ? "text-orange-500" : "text-muted-foreground")} />
        <span>{node.name}</span>
      </button>
      {isFolder && open && node.children?.map((child) => (
        <TreeNode key={child.path} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function FileTreePreview() {
  const config = useConfigStore((s) => s.config);

  const selectedDefs = {
    skillDefs: SKILL_DEFS.filter((s) => config.skills.selectedIds.includes(s.id)),
    subagentDefs: SUBAGENT_DEFS.filter((s) => config.subagents.selectedIds.includes(s.id)),
    ruleDefs: RULE_DEFS.filter((s) => config.rules.selectedIds.includes(s.id)),
    hookDefs: HOOK_DEFS.filter((s) => config.hooks.selectedIds.includes(s.id)),
    docDefs: DOC_TEMPLATE_DEFS.filter((s) => config.docs.selectedIds.includes(s.id)),
  };

  const tree = buildFileTree(config, selectedDefs);

  const fileCount = (nodes: FileNode[]): number =>
    nodes.reduce((acc, n) => acc + (n.type === "file" ? 1 : fileCount(n.children ?? [])), 0);

  return (
    <div className="rounded-xl border bg-background shadow-sm p-4 font-mono text-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold font-sans text-sm text-foreground">Output File Tree</h3>
        <span className="text-muted-foreground text-[10px]">{fileCount(tree)} files</span>
      </div>
      <div className="space-y-0.5">
        {tree.map((node) => (
          <TreeNode key={node.path} node={node} />
        ))}
      </div>
      {tree.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No files selected. Configure the options on the left.
        </div>
      )}
    </div>
  );
}
