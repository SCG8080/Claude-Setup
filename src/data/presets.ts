import { ConfigState } from "@/types/configSchema";

export interface PresetDef {
  id: string;
  label: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  config: Partial<ConfigState>;
}

const base: ConfigState = {
  basics: {
    projectName: "my-project",
    description: "",
    teamName: "",
    repoType: "fullstack",
    workflowGoal: "new",
    techStack: [],
    packageManager: "npm",
    testingStack: "",
    docStyle: "",
  },
  core: {
    includeClaudeMd: true,
    includeAgentsMd: true,
    includeSettingsJson: true,
    includeRules: true,
    includeHooks: true,
    includeSubagents: true,
    includeSkills: true,
    securityStrictness: "medium",
    editingPosture: "plan-first",
  },
  skills: { selectedIds: [] },
  subagents: { selectedIds: [] },
  rules: { selectedIds: [] },
  hooks: { selectedIds: [] },
  docs: { selectedIds: [] },
  obsidian: {
    includeVault: false,
    includeTypedFolders: true,
    includeTemplateNotes: true,
    includeGraphMeta: true,
    includeCanvasStarter: false,
    noteTaxonomy: [],
  },
  outputPreset: "minimal",
};

export const PRESETS: PresetDef[] = [
  {
    id: "minimal",
    label: "Minimal Starter",
    tagline: "Just the essentials — CLAUDE.md, settings, and one rule file.",
    badge: "Starter",
    badgeColor: "bg-gray-100 text-gray-700",
    config: {
      ...base,
      core: { ...base.core, includeSubagents: false, includeSkills: false, includeHooks: false },
      rules: { selectedIds: ["security"] },
      outputPreset: "minimal",
    },
  },
  {
    id: "standard",
    label: "Standard SDLC Starter",
    tagline: "Full SDLC workflow — rules, hooks, skills, and subagents for a healthy codebase.",
    badge: "Recommended",
    badgeColor: "bg-primary/10 text-primary",
    config: {
      ...base,
      skills: { selectedIds: ["write-tests", "document-feature", "review-pr"] },
      subagents: { selectedIds: ["code-reviewer", "test-architect", "docs-architect"] },
      rules: { selectedIds: ["frontend", "backend", "tests", "docs", "security"] },
      hooks: { selectedIds: ["format", "lint", "block-secrets"] },
      docs: { selectedIds: ["brd", "adr", "feature-spec", "pr-checklist", "runbook"] },
      outputPreset: "standard",
    },
  },
  {
    id: "reverse-engineering",
    label: "Reverse Engineering Starter",
    tagline: "Deep-dive into unknown codebases — map, document, and formalize everything.",
    badge: "Analysis",
    badgeColor: "bg-blue-100 text-blue-700",
    config: {
      ...base,
      basics: { ...base.basics, workflowGoal: "reverse" },
      skills: { selectedIds: ["reverse-engineer", "document-feature", "create-brd", "debug-root-cause"] },
      subagents: { selectedIds: ["reverse-engineer-analyst", "docs-architect", "security-reviewer"] },
      rules: { selectedIds: ["reverse-engineering", "docs", "security"] },
      hooks: { selectedIds: ["block-secrets", "block-dangerous"] },
      docs: { selectedIds: ["re-report", "adr", "feature-spec", "bug-rca"] },
      outputPreset: "standard",
    },
  },
  {
    id: "refactor-test",
    label: "Refactor + Test Starter",
    tagline: "Modernize a legacy codebase while keeping test coverage green throughout.",
    badge: "Quality",
    badgeColor: "bg-emerald-100 text-emerald-700",
    config: {
      ...base,
      basics: { ...base.basics, workflowGoal: "refactor" },
      skills: { selectedIds: ["refactor", "write-tests", "migrate-legacy", "debug-root-cause"] },
      subagents: { selectedIds: ["test-architect", "debugger", "code-reviewer"] },
      rules: { selectedIds: ["refactoring", "tests", "backend", "security"] },
      hooks: { selectedIds: ["lint", "test-changed", "block-secrets"] },
      docs: { selectedIds: ["test-strategy", "adr", "bug-rca"] },
      outputPreset: "standard",
    },
  },
  {
    id: "power-user",
    label: "Power User Claude Starter",
    tagline: "Everything enabled — full autonomous workflow with strict review controls.",
    badge: "Advanced",
    badgeColor: "bg-violet-100 text-violet-700",
    config: {
      ...base,
      core: { ...base.core, securityStrictness: "high", editingPosture: "small-batch" },
      skills: { selectedIds: ["reverse-engineer", "refactor", "write-tests", "review-pr", "document-feature", "create-brd", "generate-adr", "debug-root-cause", "migrate-legacy"] },
      subagents: { selectedIds: ["reverse-engineer-analyst", "code-reviewer", "debugger", "test-architect", "docs-architect", "security-reviewer"] },
      rules: { selectedIds: ["frontend", "backend", "tests", "docs", "security", "refactoring", "reverse-engineering"] },
      hooks: { selectedIds: ["format", "lint", "test-changed", "block-secrets", "block-dangerous"] },
      docs: { selectedIds: ["brd", "feature-spec", "adr", "pr-checklist", "test-strategy", "re-report", "bug-rca", "runbook"] },
      outputPreset: "power",
    },
  },
  {
    id: "obsidian",
    label: "Obsidian Knowledge Graph",
    tagline: "Generate a structured Obsidian vault for your codebase knowledge management.",
    badge: "Knowledge",
    badgeColor: "bg-amber-100 text-amber-700",
    config: {
      ...base,
      obsidian: {
        includeVault: true,
        includeTypedFolders: true,
        includeTemplateNotes: true,
        includeGraphMeta: true,
        includeCanvasStarter: true,
        noteTaxonomy: ["system", "module", "feature", "screen", "api", "entity", "decision", "bug", "refactor", "test"],
      },
      outputPreset: "standard",
    },
  },
  {
    id: "enterprise",
    label: "Enterprise Governance",
    tagline: "Strict controls, audit trails, formal documentation, and review gates.",
    badge: "Enterprise",
    badgeColor: "bg-slate-100 text-slate-700",
    config: {
      ...base,
      core: { ...base.core, securityStrictness: "high", editingPosture: "read-first" },
      skills: { selectedIds: ["review-pr", "create-brd", "generate-adr", "write-tests", "document-feature"] },
      subagents: { selectedIds: ["code-reviewer", "security-reviewer", "docs-architect", "test-architect"] },
      rules: { selectedIds: ["frontend", "backend", "tests", "docs", "security"] },
      hooks: { selectedIds: ["block-secrets", "block-dangerous", "lint", "format"] },
      docs: { selectedIds: ["brd", "adr", "pr-checklist", "test-strategy", "runbook", "feature-spec"] },
      outputPreset: "enterprise",
    },
  },
];
