import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import fg from 'fast-glob'
import { baseStyles } from './lib/theme'

// Generates dist/index.html — a static landing page listing all talks,
// separate from the Slidev decks themselves. Cloudflare Pages serves this
// automatically for requests to `/`.
const packageFiles = (await fg('*/src/package.json', {
  onlyFiles: true,
})).sort((a, b) => -a.localeCompare(b))

const talks = (await Promise.all(
  packageFiles.map(async (file) => {
    const talkDir = dirname(dirname(file))
    const json = JSON.parse(await fs.readFile(file, 'utf-8'))
    const command = json.scripts?.build
    const base = command?.match(/ (\S*)$/)?.[1]
    if (!base)
      return

    let title = talkDir
    let description = ''
    try {
      const readme = await fs.readFile(resolve(talkDir, 'README.md'), 'utf-8')
      title = readme.match(/^# (.*)/)?.[1]?.trim() || talkDir
      description = readme.match(/^# .*\n+(.*)/)?.[1]?.trim() || ''
    }
    catch {}

    return { dir: talkDir, base, title, description }
  }),
))
  .filter(t => t !== undefined)

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const items = talks
  .map(({ base, title, description }) => `
      <li class="card">
        <a href="${escape(base)}">
          <span class="card-title">${escape(title)}</span>
          ${description ? `<span class="card-description">${escape(description)}</span>` : ''}
        </a>
      </li>`)
  .join('')

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>talks</title>
<style>
${baseStyles}
  ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
  .card {
    border-radius: 16px;
    background: var(--color-bg-section);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-card);
    transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  }
  .card:hover {
    box-shadow: var(--shadow-card-hover);
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }
  .card a {
    display: block;
    padding: 1.25rem 1.5rem;
    text-decoration: none;
    color: inherit;
    border-radius: inherit;
  }
  .card-title {
    /* Title Medium 相当 */
    display: block;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--color-accent);
  }
  .card:hover .card-title {
    color: var(--color-accent-hover);
  }
  .card-description {
    /* Body Medium 相当 */
    display: block;
    margin-top: 0.375rem;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.015em;
    color: var(--color-text-body);
  }
</style>
</head>
<body>
<h1>talks</h1>
<ul>${items}
</ul>
</body>
</html>
`

await fs.mkdir('dist', { recursive: true })
await fs.writeFile('dist/index.html', html, 'utf-8')
