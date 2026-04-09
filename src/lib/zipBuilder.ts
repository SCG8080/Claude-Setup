"use client";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ConfigState } from "@/types/configSchema";
import { buildFileTree, flattenTree } from "@/lib/generator";
import { SKILL_DEFS } from "@/data/skills";
import { SUBAGENT_DEFS } from "@/data/subagents";
import { RULE_DEFS } from "@/data/rules";
import { HOOK_DEFS } from "@/data/hooks";
import { DOC_TEMPLATE_DEFS } from "@/data/docs";

export async function generateAndDownloadZip(config: ConfigState): Promise<void> {
  const selectedDefs = {
    skillDefs: SKILL_DEFS.filter((s) => config.skills.selectedIds.includes(s.id)),
    subagentDefs: SUBAGENT_DEFS.filter((s) => config.subagents.selectedIds.includes(s.id)),
    ruleDefs: RULE_DEFS.filter((s) => config.rules.selectedIds.includes(s.id)),
    hookDefs: HOOK_DEFS.filter((s) => config.hooks.selectedIds.includes(s.id)),
    docDefs: DOC_TEMPLATE_DEFS.filter((s) => config.docs.selectedIds.includes(s.id)),
  };

  const tree = buildFileTree(config, selectedDefs);
  const files = flattenTree(tree);

  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.path, file.content ?? "");
  });

  const blob = await zip.generateAsync({ type: "blob" });
  const filename = `${config.basics.projectName.replace(/\s+/g, "-").toLowerCase()}-claude-setup.zip`;
  saveAs(blob, filename);
}
