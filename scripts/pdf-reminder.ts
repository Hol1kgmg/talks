import fs from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

// lefthookのpre-commitから呼ばれる。ステージされたファイルのうち
// `<talk>/src/**` に差分があるトークについて、`mise run export` でのPDF再生成を
// 促すリマインドだけを表示する（自動生成はしない・コミットもブロックしない）。
const stagedFiles = process.argv.slice(2)

const talkDirs = [...new Set(
  stagedFiles
    .map(file => file.match(/^([^/]+)\/src\//)?.[1])
    .filter((dir): dir is string => Boolean(dir)),
)]

if (talkDirs.length === 0)
  process.exit(0)

const targets: string[] = []

for (const talkDir of talkDirs) {
  const pkgPath = resolve(talkDir, 'src/package.json')
  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8'))
  const exportCommand: string | undefined = pkg.scripts?.export
  if (!exportCommand)
    continue

  const output = exportCommand.match(/--output[= ](\S+)/)?.[1]
  if (!output)
    continue

  const pdfPath = resolve(talkDir, 'src', output)
  const pdfStaged = stagedFiles.some(file => resolve(file) === pdfPath)
  if (!pdfStaged)
    targets.push(talkDir)
}

if (targets.length > 0) {
  console.log('')
  console.log('[remind-export] スライドに差分がありますが、PDFがコミットに含まれていません:')
  for (const talkDir of targets)
    console.log(`  - ${talkDir}`)
  console.log('  必要であれば `mise run export` でPDFを再生成してください。')
  console.log('')
}
