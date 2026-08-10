import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import fg from 'fast-glob'

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
    <li>
      <a href="${escape(base)}">${escape(title)}</a>
      ${description ? `<p>${escape(description)}</p>` : ''}
    </li>`)
  .join('')

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>talks</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 640px; margin: 4rem auto; padding: 0 1rem; line-height: 1.6; }
  h1 { font-size: 1.5rem; }
  ul { list-style: none; padding: 0; }
  li { margin-bottom: 1.5rem; }
  a { font-size: 1.1rem; text-decoration: none; color: #2563eb; }
  a:hover { text-decoration: underline; }
  p { margin: 0.25rem 0 0; color: #555; font-size: 0.9rem; }
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
