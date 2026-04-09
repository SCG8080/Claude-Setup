export interface SkillDef {
  id: string;
  label: string;
  description: string;
  category: string;
  templateFiles: string[];
}

export const SKILL_DEFS: SkillDef[] = [
  {
    id: "reverse-engineer",
    label: "Reverse Engineer",
    description: "Systematically map unknown codebases: architecture, data models, APIs, and hidden business logic.",
    category: "Analysis",
    templateFiles: ["system-overview.md", "feature-inventory.md", "api-map.md", "data-model-map.md"],
  },
  {
    id: "refactor",
    label: "Refactor Code",
    description: "Safely modernize and restructure code with confidence — extract patterns, reduce duplication, improve readability.",
    category: "Quality",
    templateFiles: ["refactor-plan.md", "change-log.md"],
  },
  {
    id: "write-tests",
    label: "Write Tests",
    description: "Generate unit, integration, and e2e tests aligned to your test strategy and coverage goals.",
    category: "Quality",
    templateFiles: ["test-strategy.md", "coverage-plan.md"],
  },
  {
    id: "review-pr",
    label: "Review Pull Request",
    description: "Conduct structured code reviews with security, performance, and correctness checklists.",
    category: "Collaboration",
    templateFiles: ["pr-checklist.md", "review-report.md"],
  },
  {
    id: "document-feature",
    label: "Document Feature",
    description: "Generate user-facing and internal feature documentation in a consistent format.",
    category: "Documentation",
    templateFiles: ["feature-spec.md", "user-story.md"],
  },
  {
    id: "create-brd",
    label: "Create BRD",
    description: "Draft business requirement documents with stakeholder context and acceptance criteria.",
    category: "Documentation",
    templateFiles: ["brd-template.md"],
  },
  {
    id: "generate-adr",
    label: "Generate ADR",
    description: "Capture architectural decisions with context, options, and rationale for long-term traceability.",
    category: "Documentation",
    templateFiles: ["adr-template.md"],
  },
  {
    id: "debug-root-cause",
    label: "Debug Root Cause",
    description: "Structured RCA workflow to identify, isolate, and document bugs and their systemic causes.",
    category: "Operations",
    templateFiles: ["rca-template.md", "timeline.md"],
  },
  {
    id: "migrate-legacy",
    label: "Migrate Legacy Code",
    description: "Plan and execute migrations from legacy stacks to modern equivalents with minimal risk.",
    category: "Analysis",
    templateFiles: ["migration-plan.md", "risk-assessment.md"],
  },
];
