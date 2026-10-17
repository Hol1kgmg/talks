import fs from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
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

// GitHub Pages にはサーバー側リダイレクトの仕組みが無いため、
// `dist/<path>/index.html` に meta refresh を書いた静的 HTML を置いて代用する。
const GITHUB_REPO = 'https://github.com/Hol1kgmg/talks'
// TODO: 個人サイトのドメインが確定したら、各トークのルートリダイレクト先として設定する
const PERSONAL_SITE_URL = ''

const redirects = bases
  .flatMap(({ base, pdfFile, dir }) => {
    const rules: [from: string, to: string][] = []

    if (pdfFile) {
      rules.push([`${base}pdf`, `${GITHUB_REPO}/blob/main/${dir}/${pdfFile}?raw=true`])
      rules.push([`/${dir}/pdf`, `${GITHUB_REPO}/blob/main/${dir}/${pdfFile}?raw=true`])
    }

    rules.push([`${base}src`, `${GITHUB_REPO}/tree/main/${dir}`])

    if (PERSONAL_SITE_URL)
      rules.push([`/${dir}`, `${PERSONAL_SITE_URL}${base}`])

    return rules
  })

const redirectHtml = (to: string) => `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta http-equiv="refresh" content="0; url=${to}" />
<link rel="canonical" href="${to}" />
<title>Redirecting...</title>
</head>
<body>
<a href="${to}">${to}</a>
</body>
</html>
`

await Promise.all(
  redirects.map(async ([from, to]) => {
    const outDir = join('dist', from)
    await fs.mkdir(outDir, { recursive: true })
    await fs.writeFile(join(outDir, 'index.html'), redirectHtml(to), 'utf-8')
  }),
)
