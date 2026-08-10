import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'

const packageFiles = (await fg('*/src/package.json', {
  onlyFiles: true,
})).sort()

const bases = (await Promise.all(
  packageFiles.map(async (file) => {
    const talkRoot = dirname(dirname(file))
    const json = JSON.parse(await fs.readFile(file, 'utf-8'))
    const pdfFile = (await fg('*.pdf', {
      cwd: resolve(process.cwd(), talkRoot),
      onlyFiles: true,
    }))[0]
    const command = json.scripts?.build
    if (!command)
      return
    const base = command.match(/ (\S*)$/)?.[1]
    if (!base)
      return
    return {
      dir: talkRoot,
      base,
      pdfFile,
    }
  }),
))
  .filter(Boolean)

// Cloudflare Pages reads redirect rules from a plain-text `_redirects` file
// placed in the publish directory (`dist/`), one rule per line:
// https://developers.cloudflare.com/pages/configuration/redirects/
const GITHUB_REPO = 'https://github.com/Hol1kgmg/talks'
// TODO: 個人サイトのドメインが確定したら、各トークのルートリダイレクト先として設定する
const PERSONAL_SITE_URL = ''

const redirects = bases
  .flatMap(({ base, pdfFile, dir }) => {
    const lines: string[] = []

    if (pdfFile) {
      lines.push(`${base}pdf ${GITHUB_REPO}/blob/main/${dir}/${pdfFile}?raw=true 302`)
      lines.push(`/${dir}/pdf ${GITHUB_REPO}/blob/main/${dir}/${pdfFile}?raw=true 302`)
    }

    lines.push(`${base}src ${GITHUB_REPO}/tree/main/${dir} 302`)

    if (PERSONAL_SITE_URL)
      lines.push(`${dir} ${PERSONAL_SITE_URL}${base} 301`)

    lines.push(`${base}* ${base}index.html 200`)

    return lines
  })
  .join('\n')

const content = `# TODO: 個人サイトのドメインが確定したらルートリダイレクト（/ -> 個人サイト）を追加する
${redirects}
`

await fs.mkdir('dist', { recursive: true })
await fs.writeFile('dist/_redirects', content, 'utf-8')
