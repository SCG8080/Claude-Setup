import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ConfigState } from "@/types/configSchema";

const initialState: ConfigState = {
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
  skills: { selectedIds: ["reverse-engineer", "document-feature", "write-tests"] },
  subagents: { selectedIds: ["code-reviewer", "test-architect"] },
  rules: { selectedIds: ["frontend", "backend", "security"] },
  hooks: { selectedIds: ["lint", "format"] },
  docs: { selectedIds: ["brd", "adr", "runbook"] },
  obsidian: {
    includeVault: false,
    includeTypedFolders: true,
    includeTemplateNotes: true,
    includeGraphMeta: true,
    includeCanvasStarter: true,
    noteTaxonomy: ["system", "module", "feature", "api", "entity"],
  },
  outputPreset: "standard",
};

interface ConfigStore {
  config: ConfigState;
  ui: { activeTab: string };
  updateConfig: <K extends keyof ConfigState>(section: K, payload: Partial<ConfigState[K]>) => void;
  setActiveTab: (tab: string) => void;
  resetConfig: () => void;
  importConfig: (config: ConfigState) => void;
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      config: initialState,
      ui: { activeTab: "basics" },
      updateConfig: (section, payload) =>
        set((state) => ({
          config: {
            ...state.config,
            [section]: {
              ...(state.config[section] as any),
              ...payload,
            },
          },
        })),
      setActiveTab: (tab) => set((state) => ({ ui: { ...state.ui, activeTab: tab } })),
      resetConfig: () => set({ config: initialState }),
      importConfig: (config) => set({ config }),
    }),
    {
      name: "claude-sdlc-config",
    }
  )
);
