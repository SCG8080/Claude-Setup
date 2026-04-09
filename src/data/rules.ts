export interface RuleDef {
  id: string;
  label: string;
  description: string;
  filename: string;
}

export const RULE_DEFS: RuleDef[] = [
  {
    id: "frontend",
    label: "Frontend Rules",
    description: "Componentization, styling discipline, accessibility, and state management guidelines.",
    filename: "frontend.md",
  },
  {
    id: "backend",
    label: "Backend Rules",
    description: "API design, error handling, logging, database access patterns, and service boundaries.",
    filename: "backend.md",
  },
  {
    id: "tests",
    label: "Test Rules",
    description: "Test file naming, mocking strategy, coverage thresholds, and test isolation principles.",
    filename: "tests.md",
  },
  {
    id: "docs",
    label: "Documentation Rules",
    description: "When to write docs, what format, how to keep them current, and where to store them.",
    filename: "docs.md",
  },
  {
    id: "security",
    label: "Security Rules",
    description: "Secrets management, input validation, dependencies, authentication, and audit requirements.",
    filename: "security.md",
  },
  {
    id: "refactoring",
    label: "Refactoring Rules",
    description: "Safe refactoring principles, when to rename vs rewrite, keeping tests green during changes.",
    filename: "refactoring.md",
  },
  {
    id: "reverse-engineering",
    label: "Reverse Engineering Rules",
    description: "Exploration sequence, documentation artifacts required, and output format expectations.",
    filename: "reverse-engineering.md",
  },
];
