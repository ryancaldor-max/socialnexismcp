# socialnexis-mcp

MCP server for the free [SocialNexis post tools](https://socialnexis.com/mcp):
AI detector and humanizer for LinkedIn/X posts, a post quality analyzer, and a
structured post idea generator. No API key required.

## Tools

| Tool | What it does |
|---|---|
| `check_post_tells` | Detect AI-writing tells (em dashes, buzzwords, markdown artifacts) and reach mistakes, with the exact quote and fix for each. Instant. |
| `analyze_post` | Adds a six-axis quality rubric and a match against 12 proven post structures. Free daily limit: 10. |
| `generate_post_ideas` | 3 ready-to-write post ideas (hook, thesis, outline) from a topic or article. Free daily limit: 2 calls (6 ideas). |

## Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "socialnexis": {
      "command": "npx",
      "args": ["-y", "socialnexis-mcp"]
    }
  }
}
```

## Cursor / other MCP clients

Same shape: run `npx -y socialnexis-mcp` over stdio.

## Prefer a remote URL?

The same server is hosted at `https://api.socialnexis.com/mcp` (streamable
HTTP, no auth) for clients that take a URL, like claude.ai custom connectors.

## Privacy

No API key, no signup, no stored content: requests are processed and counted,
not retained. Details: [socialnexis.com/mcp/docs](https://socialnexis.com/mcp/docs)
and [socialnexis.com/privacy](https://socialnexis.com/privacy).

## The full product

These tools are the generic layer. [SocialNexis](https://socialnexis.com/mcp)
drafts in your voice, ideates from your sources without repeating itself, and
runs your LinkedIn/X engagement on autopilot.
