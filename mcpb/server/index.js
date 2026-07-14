#!/usr/bin/env node
// socialnexis-mcp — stdio MCP server for the free SocialNexis post tools.
//
// A thin proxy: each tool call POSTs to the public HTTPS endpoints (no API
// key), so the caller's own machine/IP carries the free daily limits. The
// remote streamable-HTTP variant of this server lives at
// https://api.socialnexis.com/mcp for clients that prefer a URL.
//
// Claude Desktop config:
//   { "mcpServers": { "socialnexis": { "command": "npx", "args": ["-y", "socialnexis-mcp"] } } }

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'

const API = 'https://api.socialnexis.com/api/v1/public-tools'

const TOOLS = [
  {
    name: 'check_post_tells',
    title: 'Detect AI-writing tells in a post',
    description:
      'Deterministic scan of a LinkedIn/X post draft for AI-writing tells (em dashes, buzzwords, markdown artifacts, unattributed authority, self-labeled takes) and reach best practices (engagement bait, weak openers, hashtag stuffing, scannability). Every finding includes the verbatim quote, its character range, and a prescriptive fix. Instant and free.',
    inputSchema: {
      type: 'object',
      properties: { body: { type: 'string', description: 'The post draft to scan (1-15,000 chars)' } },
      required: ['body'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    endpoint: '/tells',
    buildPayload: (args) => ({ body: args.body }),
  },
  {
    name: 'analyze_post',
    title: 'Analyze post quality (rubric + structure match)',
    description:
      'Everything in the tells scan PLUS a judged six-axis quality rubric (substance, hook, concreteness, topic clarity, question quality, self-containedness) and a match against 12 proven post structures with the beat the draft misses. Takes a few seconds. Free daily limit: 10 analyses.',
    inputSchema: {
      type: 'object',
      properties: { body: { type: 'string', description: 'The post draft to analyze (1-15,000 chars)' } },
      required: ['body'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    endpoint: '/analyze',
    buildPayload: (args) => ({ body: args.body }),
  },
  {
    name: 'generate_post_ideas',
    title: 'Generate structured LinkedIn/X post ideas',
    description:
      'Turn a topic and/or pasted article text into 3 distinct, ready-to-write post ideas: hook, thesis, outline, each on a proven post structure. Never invents facts or citations (facts come only from the text you pass). Free daily limit: 2 calls (6 ideas).',
    inputSchema: {
      type: 'object',
      properties: {
        topic: { type: 'string', description: 'Topic to ideate on (up to 200 chars)' },
        text: { type: 'string', description: 'Optional article/notes to ground facts in (up to 10,000 chars)' },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    endpoint: '/ideate',
    buildPayload: (args) => ({ topic: args.topic, text: args.text }),
  },
]

function textResult(payload, isError = false) {
  return {
    content: [{ type: 'text', text: typeof payload === 'string' ? payload : JSON.stringify(payload) }],
    ...(isError ? { isError: true } : {}),
  }
}

const server = new Server(
  { name: 'socialnexis-post-tools', version: '1.0.0' },
  { capabilities: { tools: {} } },
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map(({ endpoint, buildPayload, ...tool }) => tool),
}))

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const tool = TOOLS.find((t) => t.name === req.params.name)
  if (!tool) return textResult(`Unknown tool: ${req.params.name}`, true)
  try {
    const res = await fetch(`${API}${tool.endpoint}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(tool.buildPayload(req.params.arguments ?? {})),
      signal: AbortSignal.timeout(90_000),
    })
    const json = await res.json().catch(() => null)
    if (!res.ok) {
      const message = json?.error?.message ?? `Request failed (${res.status})`
      const cta = json?.cta ? ` ${json.cta.message} ${json.cta.url}` : ''
      return textResult(`${message}${cta}`, true)
    }
    return textResult(json)
  } catch (err) {
    return textResult(`SocialNexis tools are unreachable right now: ${err?.message ?? err}`, true)
  }
})

const transport = new StdioServerTransport()
await server.connect(transport)
