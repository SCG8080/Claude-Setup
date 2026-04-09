export interface DocTemplateDef {
  id: string;
  label: string;
  description: string;
  filename: string;
  folder: string;
}

export const DOC_TEMPLATE_DEFS: DocTemplateDef[] = [
  {
    id: "brd",
    label: "Business Requirements Document",
    description: "Structured BRD with problem statement, goals, stakeholders, and acceptance criteria.",
    filename: "brd-template.md",
    folder: "docs/features",
  },
  {
    id: "feature-spec",
    label: "Feature Spec",
    description: "Product feature specification with design decisions, edge cases, and implementation guidance.",
    filename: "feature-spec.md",
    folder: "docs/features",
  },
  {
    id: "adr",
    label: "Architecture Decision Record",
    description: "Captures the context, options, and rationale for a significant architectural choice.",
    filename: "adr-template.md",
    folder: "docs/decisions",
  },
  {
    id: "pr-checklist",
    label: "PR Review Checklist",
    description: "Structured checklist ensuring security, performance, and correctness are reviewed consistently.",
    filename: "pr-checklist.md",
    folder: "docs/sdlc",
  },
  {
    id: "test-strategy",
    label: "Test Strategy Template",
    description: "Defines testing philosophy, scope, tooling, and coverage expectations for the project.",
    filename: "test-strategy.md",
    folder: "docs/testing",
  },
  {
    id: "re-report",
    label: "Reverse Engineering Report",
    description: "Full codebase analysis report: system overview, modules, APIs, and data flows.",
    filename: "re-report-template.md",
    folder: "docs/reverse-engineering",
  },
  {
    id: "bug-rca",
    label: "Bug Root Cause Analysis",
    description: "Triage and RCA template for production incidents and regression bugs.",
    filename: "bug-rca.md",
    folder: "docs/sdlc",
  },
  {
    id: "runbook",
    label: "Runbook Template",
    description: "Operational runbook format for deployments, rollbacks, and incident response.",
    filename: "runbook.md",
    folder: "docs/runbooks",
  },
];
