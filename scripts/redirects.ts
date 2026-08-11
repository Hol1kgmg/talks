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

    return lines
  })
  .join('\n')

const content = `# TODO: 個人サイトのドメインが確定したらルートリダイレクト（/ -> 個人サイト）を追加する
${redirects}
`

await fs.mkdir('dist', { recursive: true })
await fs.writeFile('dist/_redirects', content, 'utf-8')

// スライド内の個別ページ（例: /2026/xxx/3）は実ファイルが存在しないため、
// `${base}* -> ${base}index.html 200` のような _redirects の書き換えルールで
// SPAフォールバックさせたいが、Cloudflare Pagesはこのパターンを
// 「無限ループの可能性あり」として無条件に無視する
// （from が `/*` 終わり・to が `/index(.html)?` 終わりの組み合わせは弾かれる仕様）。
// また回避のため書き換え先をディレクトリパスにしても、_redirectsのマッチは
// 静的アセットの存在チェックより先に評価されるため、同ディレクトリ配下の
// JS/CSSアセットまでindex.htmlへ巻き込んで壊れてしまう。
// そこでdist/404.htmlと同じ「未一致リクエストに対して最も近い階層の
// 404.htmlを自動的に返す」というCloudflare Pages標準の仕組みに乗せる。
// 404.htmlはindex.htmlと同一内容にしておくことで、HTTPステータスは404のままだが
// ブラウザはSlidevクライアント（Vue Router）を実行し、正しいスライドを描画する。
await Promise.all(
  bases.map(async ({ base }) => {
    const outDir = join('dist', base)
    await fs.copyFile(join(outDir, 'index.html'), join(outDir, '404.html'))
  }),
)
