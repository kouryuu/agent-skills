---
name: ux-rules-don
description: Applies Don Norman’s human-centered design principles to evaluate or generate user interfaces. Ensures visibility of actions, clear feedback, natural mappings, error prevention, and minimal cognitive load.
---


# Don Norman UX Rules for Agentic Systems

Set of instructions, rules, and guidelines for the agent to apply Don Norman’s UX principles when designing, reviewing, or generating user interfaces.


## When to use

Use this skill when:

* Designing a new UI or interaction flow
* Evaluating usability of a product or feature
* Generating UI components or workflows
* Reviewing product UX for improvements
* Performing automated UX audits
* Designing developer tools, dashboards, or consumer interfaces
* Reducing cognitive load in complex workflows

Activate this skill when the goal involves **human interaction with software systems**.

## Instructions

1. Identify the **user goal** and expected outcome.

2. Determine the **available user actions** and ensure they are visible.

   * Actions must be discoverable.
   * Hidden functionality should include signifiers.

3. Verify **affordances and signifiers**.

   * Interactive elements must visually indicate interaction.
   * Use buttons, sliders, inputs, or clear interaction cues.

4. Ensure **natural mapping between controls and outcomes**.

   * Controls should correspond spatially or logically with results.
   * Prefer direct manipulation (drag, swipe, adjust).

5. Provide **immediate feedback for every action**.

   * Visual state change
   * Loading indicators
   * Success or error messages

6. Maintain **system status visibility**.

   * Users should always know:

     * where they are
     * what is happening
     * what will happen next

7. Prevent errors using **constraints**.

   * Disable invalid actions
   * Validate inputs
   * Reduce dangerous options

8. Enable **error recovery**.

   * Provide undo or redo
   * Allow cancellation
   * Avoid irreversible destructive actions

9. Favor **recognition over recall**.

   * Use menus, lists, and visible options
   * Avoid requiring users to remember commands or data

10. Minimize **cognitive load**.

    * Reduce decision points
    * Provide defaults
    * Group related controls

11. Maintain **interaction consistency**.

    * Similar actions must behave similarly
    * Reuse patterns across the interface

12. Apply **progressive disclosure**.

    * Show simple options first
    * Reveal advanced controls only when necessary

13. Ensure **discoverability**.

    * Users should understand how to interact without documentation.

14. Evaluate interaction using the **Norman Action Cycle**:

```
goal
→ intention
→ action
→ system state
→ perception
→ interpretation
→ evaluation
```

15. Minimize the **two UX gaps**:

* Gulf of Execution: difficulty performing an intended action
* Gulf of Evaluation: difficulty understanding system feedback


16. Evaluate UX quality using the following heuristic dimensions:

```
visibility
feedback
mapping
constraints
recoverability
consistency
cognitive_load
error_probability
discoverability
```

17. Prefer canonical interaction patterns:

* visible controls
* immediate feedback
* direct manipulation
* undoable actions
* progressive disclosure

18. Avoid common UX anti-patterns:

* hidden actions
* delayed feedback
* irreversible operations
* inconsistent controls
* invisible system state