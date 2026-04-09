export interface HookDef {
  id: string;
  label: string;
  description: string;
  filename: string;
  event: string;
}

export const HOOK_DEFS: HookDef[] = [
  {
    id: "format",
    label: "Auto-Format Hook",
    description: "Runs Prettier or language-specific formatter before any file is accepted.",
    filename: "format.sh",
    event: "PostToolUse",
  },
  {
    id: "lint",
    label: "Lint Hook",
    description: "Runs ESLint / language-specific linter and fails on new warnings.",
    filename: "lint.sh",
    event: "PostToolUse",
  },
  {
    id: "test-changed",
    label: "Test Changed Files",
    description: "Automatically runs tests for files changed by the latest tool call.",
    filename: "test-changed.sh",
    event: "PostToolUse",
  },
  {
    id: "block-secrets",
    label: "Block Secrets Guard",
    description: "Intercepts any file write containing tokens, keys, or passwords and aborts the operation.",
    filename: "block-secrets.sh",
    event: "PreToolUse",
  },
  {
    id: "block-dangerous",
    label: "Block Dangerous Commands",
    description: "Blocks high-risk bash commands like rm -rf, curl | bash, and npm publish on PreToolUse.",
    filename: "block-dangerous.sh",
    event: "PreToolUse",
  },
];
