import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'
import { baseStyles } from './lib/theme'

// ボタン内にインライン埋め込みするアイコン。fill="#000000"固定のSVGを
// currentColorに置き換えることで、.card-action:hoverの色変化に追従させる。
async function loadIcon(name: string) {
  const svg = await fs.readFile(resolve('scripts/assets/icons', `${name}.svg`), 'utf-8')
  return svg.replace(/fill="#000000"/, 'fill="currentColor"')
}

const [openIcon, presenterIcon, pdfIcon] = await Promise.all([
  loadIcon('slideshow'),
  loadIcon('projector-screen'),
  loadIcon('file-pdf'),
])

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

    // scripts/redirects.ts が同じ規則で検出したPDFを `${base}pdf` にリダイレクトするため、
    // ホームページ側でも同じ規則でPDFの有無を判定してリンクの出し分けに使う。
    const hasPdf = (await fg('*.pdf', {
      cwd: resolve(process.cwd(), talkDir),
      onlyFiles: true,
    })).length > 0

    return { dir: talkDir, base, title, description, hasPdf }
  }),
))
  .filter(t => t !== undefined)

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const items = talks
  .map(({ base, title, description, hasPdf }) => `
      <li class="card">
        <a class="card-body" href="${escape(base)}">
          <span class="card-title">${escape(title)}</span>
          ${description ? `<span class="card-description">${escape(description)}</span>` : ''}
        </a>
        <div class="card-actions">
          <a class="card-action" href="${escape(base)}" title="スライドを開く" aria-label="スライドを開く">${openIcon}</a>
          <a class="card-action" href="${escape(base)}presenter/1" title="発表モードで開く" aria-label="発表モードで開く">${presenterIcon}</a>
          ${hasPdf
            ? `<a class="card-action" href="${escape(base)}pdf" title="PDFをダウンロード" aria-label="PDFをダウンロード">${pdfIcon}</a>`
            : `<span class="card-action card-action-disabled" title="PDF未エクスポート" aria-label="PDF未エクスポート">${pdfIcon}</span>`}
        </div>
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
  .card-body {
    display: block;
    padding: 1.25rem 1.5rem 1rem;
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
  .card-body:hover .card-title {
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
  .card-actions {
    display: flex;
    gap: 0.5rem;
    padding: 0 1.5rem 1.25rem;
  }
  .card-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 999px;
    border: 1px solid var(--color-border);
    text-decoration: none;
    color: var(--color-text-body);
    background: transparent;
    transition: border-color 0.2s ease, color 0.2s ease;
  }
  .card-action svg {
    width: 1.125rem;
    height: 1.125rem;
  }
  .card-action:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
  .card-action-disabled {
    color: var(--color-border);
    cursor: not-allowed;
  }
  .card-action-disabled:hover {
    border-color: var(--color-border);
    color: var(--color-border);
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
