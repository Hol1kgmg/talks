import fs from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import { execa } from 'execa'

// lefthookのpre-commitから呼ばれる。ステージされたファイルのうち
// `<talk>/src/**` に差分があるトークだけ `pnpm run export` でPDFを再生成し、
// 生成物をgit addしてそのままコミットに含める。
const stagedFiles = process.argv.slice(2)

const talkDirs = [...new Set(
  stagedFiles
    .map(file => file.match(/^([^/]+)\/src\//)?.[1])
    .filter((dir): dir is string => Boolean(dir)),
)]

if (talkDirs.length === 0)
  process.exit(0)

for (const talkDir of talkDirs) {
  const pkgPath = resolve(talkDir, 'src/package.json')
  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8'))
  const exportCommand: string | undefined = pkg.scripts?.export
  if (!exportCommand) {
    console.warn(`[export-changed] ${talkDir} has no "export" script, skipping`)
    continue
  }

  const output = exportCommand.match(/--output[= ](\S+)/)?.[1]
  if (!output) {
    console.warn(`[export-changed] Could not determine PDF output path for ${talkDir}, skipping`)
    continue
  }

  console.log(`[export-changed] Exporting PDF for ${talkDir}...`)
  await execa('pnpm', ['run', 'export'], {
    cwd: resolve(talkDir, 'src'),
    stdio: 'inherit',
  })

  const pdfPath = resolve(talkDir, 'src', output)
  await execa('git', ['add', pdfPath], { stdio: 'inherit' })
}
