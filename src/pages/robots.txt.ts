import { type APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const robotsTxt = `
User-agent: *
Content-Signal: search=yes,ai-train=no
Allow: /

User-agent: Amazonbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: meta-externalagent
Disallow: /

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
  `.trim();

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
