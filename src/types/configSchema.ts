import { z } from "zod";

export const ProjectBasicsSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  teamName: z.string().optional(),
  repoType: z.enum(["frontend", "backend", "fullstack", "mobile", "monorepo", "other"]),
  workflowGoal: z.enum(["new", "reverse", "refactor", "both"]),
  techStack: z.array(z.string()),
  packageManager: z.enum(["npm", "yarn", "pnpm", "bun"]),
  testingStack: z.string().optional(),
  docStyle: z.string().optional(),
});

export const ClaudeCoreSchema = z.object({
  includeClaudeMd: z.boolean(),
  includeAgentsMd: z.boolean(),
  includeSettingsJson: z.boolean(),
  includeRules: z.boolean(),
  includeHooks: z.boolean(),
  includeSubagents: z.boolean(),
  includeSkills: z.boolean(),
  securityStrictness: z.enum(["low", "medium", "high"]),
  editingPosture: z.enum(["read-first", "plan-first", "small-batch", "aggressive"]),
});

export const SelectionSchema = z.object({
  selectedIds: z.array(z.string()),
});

export const ObsidianVaultSchema = z.object({
  includeVault: z.boolean(),
  includeTypedFolders: z.boolean(),
  includeTemplateNotes: z.boolean(),
  includeGraphMeta: z.boolean(),
  includeCanvasStarter: z.boolean(),
  noteTaxonomy: z.array(z.string()),
});

export const OutputPresetSchema = z.enum([
  "minimal",
  "standard",
  "power",
  "team",
  "solo",
  "strict",
  "startup",
  "enterprise"
]);

export const ConfigSchema = z.object({
  basics: ProjectBasicsSchema,
  core: ClaudeCoreSchema,
  skills: SelectionSchema,
  subagents: SelectionSchema,
  rules: SelectionSchema,
  hooks: SelectionSchema,
  docs: SelectionSchema,
  obsidian: ObsidianVaultSchema,
  outputPreset: OutputPresetSchema,
});

export type ConfigState = z.infer<typeof ConfigSchema>;
