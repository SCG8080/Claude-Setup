export interface SubagentDef {
  id: string;
  label: string;
  role: string;
  description: string;
  toolScope: string[];
}

export const SUBAGENT_DEFS: SubagentDef[] = [
  {
    id: "reverse-engineer-analyst",
    label: "Reverse Engineer Analyst",
    role: "Codebase Analyst",
    description: "Systematically explores unknown repositories, maps dependencies, and produces structured documentation of architecture and data flows.",
    toolScope: ["Read files", "Glob patterns", "Search", "Write output docs"],
  },
  {
    id: "code-reviewer",
    label: "Code Reviewer",
    role: "Code Quality Enforcer",
    description: "Reviews pull requests and changed files against the project's coding standards, security requirements, and performance expectations.",
    toolScope: ["Read files", "Git diff", "Bash (read-only)", "Markdown output"],
  },
  {
    id: "debugger",
    label: "Debugger",
    role: "Root Cause Analyst",
    description: "Runs structured root cause analysis sessions, traces error paths through log files and source, and documents findings.",
    toolScope: ["Read files", "Run tests", "Search logs", "Bash (isolated)"],
  },
  {
    id: "test-architect",
    label: "Test Architect",
    role: "Test Coverage Strategist",
    description: "Plans and generates unit, integration, and e2e tests — including mocks, fixtures, and coverage configurations.",
    toolScope: ["Read files", "Write test files", "Run test runner", "Analyze coverage"],
  },
  {
    id: "docs-architect",
    label: "Documentation Architect",
    role: "Documentation Builder",
    description: "Generates feature specs, ADRs, BRDs, runbooks, and Obsidian vault entries from source code and user input.",
    toolScope: ["Read files", "Write markdown", "Search codebase"],
  },
  {
    id: "security-reviewer",
    label: "Security Reviewer",
    role: "Security Auditor",
    description: "Identifies secrets, unsafe patterns, dependency vulnerabilities, and injection risks across the codebase.",
    toolScope: ["Read files", "Run audit scripts", "Bash (read-only)", "Report generation"],
  },
];
