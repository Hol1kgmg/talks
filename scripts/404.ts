import fs from 'node:fs/promises'
import { baseStyles } from './lib/theme'

// Generates dist/404.html — Cloudflare Pages automatically serves this
// for requests to any path that doesn't match a talk or a redirect rule.
const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>404 - talks</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<style>
${baseStyles}
  body { text-align: center; padding-top: 6rem; }
  .code {
    /* Headline Small よりさらに大きい強調表示 */
    font-size: 4rem;
    font-weight: 400;
    color: var(--color-accent);
    margin: 0;
  }
  h1 { margin-top: 0.5rem; }
  p { margin: 0 0 2rem; }
  a {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 16px;
    background: var(--color-bg-section);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-card);
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 500;
    transition: box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }
  a:hover {
    box-shadow: var(--shadow-card-hover);
    border-color: var(--color-accent);
    color: var(--color-accent-hover);
  }
</style>
</head>
<body>
<p class="code">404</p>
<h1>ページが見つかりません</h1>
<p>お探しのページは移動または削除された可能性があります。</p>
<a href="/">トップページへ戻る</a>
</body>
</html>
`

await fs.mkdir('dist', { recursive: true })
await fs.writeFile('dist/404.html', html, 'utf-8')
