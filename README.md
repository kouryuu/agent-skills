# Agent Skills

Personal agent skills by [@kouryuu](https://github.com/kouryuu).

## Installation

These skills follow the [open agent skills](https://github.com/vercel-labs/skills) layout, so the
`skills` CLI can install them into Claude Code, Codex, Cursor, and other supported agents. No global
install is needed — `npx` runs it on demand.

Install into the current repository, picking skills and agents interactively:

```bash
npx skills add kouryuu/agent-skills --full-depth
```

`--full-depth` is required: the Matt Pocock skills live in nested subdirectories
(`mattpocock/<category>/<skill>/`), and without it the CLI only discovers the three top-level skills.

Install globally, so the skills are available in every project:

```bash
npx skills add kouryuu/agent-skills --full-depth --global
```

Install every skill into every detected agent without any prompts (`--all` is shorthand for
`--skill '*' --agent '*' -y`):

```bash
npx skills add kouryuu/agent-skills --full-depth --all
```

Install only the skills you want, by name (see the **Name** column in the table below):

```bash
npx skills add kouryuu/agent-skills --full-depth --skill code-review,grilling
```

Pick the target agents explicitly instead of accepting the detected default:

```bash
npx skills add kouryuu/agent-skills --full-depth --skill teach --agent claude-code,codex
```

Other useful commands:

```bash
npx skills add kouryuu/agent-skills --full-depth --list   # preview available skills, install nothing
npx skills use kouryuu/agent-skills --skill grilling      # one-off prompt, no install
npx skills list                                           # show installed skills
npx skills update                                         # update installed skills
npx skills remove --skill code-review                     # uninstall one skill
```

By default the CLI symlinks skills into each agent's directory; pass `--copy` if you would rather
have standalone copies.

### Manual installation

If you prefer not to use the CLI, copy a skill's directory into your agent's skills folder — for
Claude Code that is `~/.claude/skills/` (global) or `.claude/skills/` (per project):

```bash
git clone https://github.com/kouryuu/agent-skills.git
cp -r agent-skills/mattpocock/engineering/code-review ~/.claude/skills/
```

Each skill is self-contained: copy the whole directory, including any reference files next to
`SKILL.md`.

## Skills

| Skill | Name | Description |
| --- | --- | --- |
| [Don Norman UX Rules for Agentic Systems](don-norman-ux/SKILL.md) | `ux-rules-don` | Applies Don Norman's human-centered design principles to evaluate or generate user interfaces. Ensures visibility of actions, clear feedback, natural mappings, error prevention, and minimal cognitive load. |
| [APE Prompt Improver](ape/SKILL.md) | `ape-prompt-improver` | Improves user prompts using the APE pipeline. Calls the `ape` CLI to generate, score, and rank improved variants of any prompt before executing it. |
| [Web Project Scaffold with Backend](project-scaffold-web-with-backend/SKILL.md) | `project-scaffold-web-with-backend` | Creates typed, observable web starters with React/Vite, a choice of backend, explicit contracts, and browser-first testing. |
| [Matt Pocock: Code Review](mattpocock/engineering/code-review/SKILL.md) | `code-review` | Reviews a diff against the repository's coding standards and its originating specification, reporting the two assessments separately. |
| [Matt Pocock: Domain Modeling](mattpocock/engineering/domain-modeling/SKILL.md) | `domain-modeling` | Maintains a project's domain glossary and records consequential architecture decisions as ADRs. |
| [Matt Pocock: Codebase Design](mattpocock/engineering/codebase-design/SKILL.md) | `codebase-design` | Provides vocabulary and principles for designing deep, testable modules with small interfaces. |
| [Matt Pocock: Prototype](mattpocock/engineering/prototype/SKILL.md) | `prototype` | Creates disposable logic or UI prototypes to settle a focused design question. |
| [Matt Pocock: Research](mattpocock/engineering/research/SKILL.md) | `research` | Delegates primary-source research and saves cited findings in the repository. |
| [Matt Pocock: Resolving Merge Conflicts](mattpocock/engineering/resolving-merge-conflicts/SKILL.md) | `resolving-merge-conflicts` | Resolves an in-progress merge or rebase by reconciling the original intent behind each conflict. |
| [Matt Pocock: To Spec](mattpocock/engineering/to-spec/SKILL.md) | `to-spec` | Turns a completed discussion into a structured issue-tracker specification. |
| [Matt Pocock: Grilling](mattpocock/productivity/grilling/SKILL.md) | `grilling` | Stress-tests a plan, decision, or idea through a structured, multi-round interview. |
| [Matt Pocock: Retro](mattpocock/in-progress/retro/SKILL.md) | `retro` | Reviews a coding session and proposes environment improvements ordered by severity. |
| [Matt Pocock: Teach](mattpocock/productivity/teach/SKILL.md) | `teach` | Guides multi-session learning through missions, resources, interactive lessons, and learning records. |
| [Matt Pocock: Wait What](mattpocock/productivity/wait-what/SKILL.md) | `wait-what` | Re-explains a message in simpler language using the project's established vocabulary. |
