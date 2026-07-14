# SocialNexis Agent Tools

Free tools for AI agents: analyze LinkedIn/X post drafts for **AI-writing
tells** and **reach best practices**, and generate **structured post ideas**.
No API key required.

Built by [SocialNexis](https://socialnexis.com) — the AI agent that runs your
LinkedIn and X presence end to end.

## Install

**Claude Code** (plugin marketplace):

```
/plugin marketplace add ryancaldor-max/socialnexismcp
/plugin install socialnexis-post-tools@socialnexis
```

**OpenClaw** (ClawHub):

```
clawhub install socialnexis-post-tools
```

**Any agent / raw API** — the endpoints are public, docs in
[skills/socialnexis-post-tools/SKILL.md](skills/socialnexis-post-tools/SKILL.md):

```bash
curl -s -X POST https://api.socialnexis.com/api/v1/public-tools/tells \
  -H 'content-type: application/json' \
  -d '{"body": "Excited to share this game-changer — thoughts?"}'
```

## What you get

| Tool | What it does | Cost |
|---|---|---|
| `tells` | Deterministic scan: em dashes, markdown, buzzwords, engagement bait, weak openers, 12 checks total — each finding with a quote, char range, and fix | Free, instant |
| `analyze` | Everything above + a 6-axis quality rubric + which of 12 proven post structures your draft resembles (and the beat it misses) | Free |
| `ideate` | 3 distinct post ideas from a topic or pasted article — each with hook, thesis, outline, and a named structure. Never invents citations | Free |

Rate limits: 60/h (`tells`), 20/h (`analyze`+`ideate`) per IP.

## The full product

These tools are the generic layer. [SocialNexis](https://socialnexis.com/mcp)
drafts in **your** voice, ideates from **your** sources without repeating
itself, and runs your LinkedIn/X engagement on autopilot with a real browser.

## License

MIT — the skill files in this repo. The API they call is a hosted service.
