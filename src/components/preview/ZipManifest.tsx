"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { SKILL_DEFS } from "@/data/skills";
import { SUBAGENT_DEFS } from "@/data/subagents";
import { RULE_DEFS } from "@/data/rules";
import { HOOK_DEFS } from "@/data/hooks";
import { DOC_TEMPLATE_DEFS } from "@/data/docs";
import { buildFileTree, flattenTree } from "@/lib/generator";
import { Badge } from "@/components/ui/badge";
import { FileText, File } from "lucide-react";

export default function ZipManifest() {
  const config = useConfigStore((s) => s.config);

  const selectedDefs = {
    skillDefs: SKILL_DEFS.filter((s) => config.skills.selectedIds.includes(s.id)),
    subagentDefs: SUBAGENT_DEFS.filter((s) => config.subagents.selectedIds.includes(s.id)),
    ruleDefs: RULE_DEFS.filter((s) => config.rules.selectedIds.includes(s.id)),
    hookDefs: HOOK_DEFS.filter((s) => config.hooks.selectedIds.includes(s.id)),
    docDefs: DOC_TEMPLATE_DEFS.filter((s) => config.docs.selectedIds.includes(s.id)),
  };

  const tree = buildFileTree(config, selectedDefs);
  const allFiles = flattenTree(tree);

  // Group by top-level folder
  const groups: Record<string, typeof allFiles> = {};
  allFiles.forEach((f) => {
    const top = f.path.split("/")[0];
    if (!groups[top]) groups[top] = [];
    groups[top].push(f);
  });

  const totalSize = allFiles.reduce((acc, f) => acc + (f.content?.length ?? 0), 0);
  const formatBytes = (b: number) => b > 1024 ? `~${(b / 1024).toFixed(1)} KB` : `${b} B`;

  return (
    <div className="rounded-xl border bg-background shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Zip Contents Summary</h3>
        <div className="flex gap-2">
          <Badge variant="secondary">{allFiles.length} files</Badge>
          <Badge variant="outline">{formatBytes(totalSize)}</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groups).map(([group, files]) => (
          <div key={group}>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group}/</h4>
              <span className="text-[10px] text-muted-foreground">({files.length} file{files.length !== 1 ? "s" : ""})</span>
            </div>
            <div className="space-y-1">
              {files.map((file) => (
                <div key={file.path} className="flex items-center gap-2 text-xs text-muted-foreground py-0.5">
                  {file.name.endsWith(".md") ? (
                    <FileText className="w-3 h-3 text-blue-500 shrink-0" />
                  ) : (
                    <File className="w-3 h-3 shrink-0" />
                  )}
                  <code className="font-mono flex-1 truncate">{file.path}</code>
                  <span className="text-[10px] shrink-0">{formatBytes(file.content?.length ?? 0)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {allFiles.length === 0 && (
        <div className="text-center py-8 text-sm text-muted-foreground">
          No files configured. Set up your options on the left.
        </div>
      )}
    </div>
  );
}
