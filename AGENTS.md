# Repository Agent Instructions

Before making changes in this repository, read and follow every Markdown file in `.code-convention/`.

Current required convention files:

- `.code-convention/agent.md`

Apply those rules together with any user request. In particular:

- Keep changes minimal and directly tied to the request.
- Ask when requirements are ambiguous or risky.
- For Discord interactions, defer before any slow repository, Google Sheets, Notion, AI, or network work.
- After `deferReply()` or `deferEdit()`, respond through the interaction hook only.
- Run relevant tests after code changes when feasible.
