---
name: ape-prompt-improver
description: Improves user prompts using the APE (Automatic Prompt Engineer) pipeline. Calls the ape CLI tool to generate, score, and rank improved variants of any prompt before executing it.
---

# APE Prompt Improver

Automatically improve user prompts before acting on them by invoking the `ape` CLI — a tool inspired by the Automatic Prompt Engineer paper (Zhou et al., ICLR 2023).

## When to use

Use this skill when:

* A user provides a vague, underspecified, or low-quality prompt
* The user explicitly asks you to improve or refine their prompt
* You want to ensure the best possible prompt is used before executing a complex task
* The user asks for help writing prompts for LLMs
* You are chaining prompts and want to optimize an intermediate step

Do **not** use this skill when:

* The user's prompt is already highly specific and well-structured
* The task is trivial (e.g. "what time is it")
* The user explicitly says not to modify their prompt
* Speed is critical and the extra API call would cause unacceptable delay

## Prerequisites

The `ape` CLI must be installed and available:

```bash
bunx @rodkings/ape-cli --help
```

One of these environment variables must be set:
* `OPENAI_API_KEY` — for OpenAI-compatible providers
* `ANTHROPIC_API_KEY` — for Claude

## Instructions

1. **Identify the user's prompt** that would benefit from improvement.

2. **Run the ape CLI** to generate and rank improved variants:

   For the single best variant (recommended for most cases):
   ```bash
   echo "<user's prompt>" | bunx @rodkings/ape-cli --single
   ```

   For the best variant as structured JSON:
   ```bash
   echo "<user's prompt>" | bunx @rodkings/ape-cli --json --single
   ```

   For multiple ranked variants to present as options:
   ```bash
   echo "<user's prompt>" | bunx @rodkings/ape-cli --json --count 3
   ```

3. **Use the improved prompt.** Depending on the context:

   * **Silent improvement**: Use the top-ranked variant directly as if the user wrote it. Best when the user won't notice or care about the rewording.
   * **Suggest to user**: Present the improved prompt and ask if they'd like to use it. Best when the change is significant or the user might want control.
   * **Present options**: Show 2–3 ranked variants and let the user pick. Best when the user explicitly asked for prompt help.

4. **When presenting improvements to the user**, explain what changed using the reasoning and feedback from the JSON output:

   ```bash
   echo "<prompt>" | bunx @rodkings/ape-cli --json --single
   ```

   The JSON output includes:
   * `text` — the improved prompt
   * `reasoning` — what was changed and why
   * `scores.clarity` — how clear the prompt is (1–10)
   * `scores.specificity` — how specific and detailed (1–10)
   * `scores.effectiveness` — how likely to produce a quality response (1–10)
   * `overall` — mean score (1–10)
   * `feedback` — brief evaluator commentary

5. **Optional flags** for fine-tuning:

   | Flag | Usage |
   |------|-------|
   | `--provider claude` | Use Claude instead of OpenAI |
   | `--model <name>` | Specify a particular model |
   | `--base-url <url>` | Point at a custom API endpoint |
   | `--count <n>` | Generate more or fewer variants (default: 5) |
   | `--verbose` | See the full scored table with color-coded ratings |

## Examples

### Silent improvement before executing a task

```
User: "summarize this article"
Agent thinks: This prompt is vague. Let me improve it.
Agent runs: echo "summarize this article" | bunx @rodkings/ape-cli --single
Agent gets: "Provide a concise summary of the following article, highlighting the key arguments, supporting evidence, and conclusions in 3-5 bullet points."
Agent uses the improved prompt internally.
```

### Presenting an improved prompt to the user

```
User: "help me write a better prompt for generating code"
Agent runs: echo "generate code" | bunx @rodkings/ape-cli --json --single
Agent responds:
  "Here's an improved version of your prompt (scored 8.7/10):

   'You are an expert software engineer. Given the following requirements,
   generate clean, well-documented code with error handling...'

   Changes: Added role assignment, specified code quality expectations,
   and included error handling requirement."
```

### Offering multiple options

```
User: "can you improve this prompt for me: explain quantum computing"
Agent runs: echo "explain quantum computing" | bunx @rodkings/ape-cli --json --count 3
Agent presents the top 3 variants with scores and lets the user choose.
```

## How it works

The `ape` CLI implements a simplified version of the APE (Automatic Prompt Engineer) pipeline:

1. **Generate** — An LLM produces N improved variants of the prompt (high temperature for diversity)
2. **Score** — The same LLM judges each variant on clarity, specificity, and effectiveness (low temperature for consistency)
3. **Rank** — Variants are sorted by overall score, best first

This mirrors the proposal → scoring → selection stages from the APE paper (Zhou et al., ICLR 2023), which demonstrated that LLMs can engineer prompts at human-level or better.
