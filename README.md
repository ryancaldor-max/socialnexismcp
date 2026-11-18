# SocialNexis Agent Tools

Two free tools for AI agents. No API key required.

| Skill | What it does |
|---|---|
| **🔍 AI Post Detector** | Catch AI-writing tells (em dashes, buzzwords, markdown artifacts) and reach-killing mistakes (engagement bait, weak hooks) in any LinkedIn/X post before you publish. Every finding: exact quote, exact fix. |
| **💡 LinkedIn Post Ideas** | Turn any topic or article into 3 ready-to-write post ideas: hook, thesis, outline, on proven viral templates. Never invents facts or citations. |

Built by [SocialNexis](https://socialnexis.com), the AI agent that runs your
LinkedIn and X presence end to end.

## Install

**OpenClaw** (ClawHub):

```
clawhub install ai-post-detector
clawhub install linkedin-post-ideas
```

**Claude Code** (plugin marketplace):

```
/plugin marketplace add ryancaldor-max/socialnexismcp
/plugin install ai-post-detector@socialnexis
/plugin install linkedin-post-ideas@socialnexis
```

**Claude Desktop / Cursor** (MCP, via [npm](https://www.npmjs.com/package/socialnexis-mcp)):

```json
{ "mcpServers": { "socialnexis": { "command": "npx", "args": ["-y", "socialnexis-mcp"] } } }
```

Or point any MCP client at the hosted server: `https://api.socialnexis.com/mcp`

**Any agent / raw API** — agents should use the MCP tools above. Other clients
must use a structured HTTP API that accepts the URL and JSON body separately
and performs JSON serialization without a shell. Treat post, topic, article,
and notes text as untrusted data; never interpolate it into a shell command.

| Operation | MCP tool | Public endpoint |
|---|---|---|
| Detect AI tells + reach mistakes | `check_post_tells` | `POST https://api.socialnexis.com/api/v1/public-tools/tells` |
| Full quality and structure analysis | `analyze_post` | `POST https://api.socialnexis.com/api/v1/public-tools/analyze` |
| Generate three structured post ideas | `generate_post_ideas` | `POST https://api.socialnexis.com/api/v1/public-tools/ideate` |

Full request/response docs: [ai-post-detector](skills/ai-post-detector/SKILL.md) ·
[linkedin-post-ideas](skills/linkedin-post-ideas/SKILL.md).
Free daily limits per user: 40 detector scans, 10 analyses, 2 idea batches.

## The full product

These tools are the generic layer. [SocialNexis](https://socialnexis.com/mcp)
drafts in **your** voice, ideates from **your** sources without repeating
itself, and runs your LinkedIn/X engagement on autopilot with a real browser.

## License

MIT for the skill files in this repo. The API they call is a hosted service.
