import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { findUp } from 'find-up'
import { x } from 'tinyexec'

const [base, ...args] = process.argv.slice(2)

const cwd = process.cwd()
const root = dirname(await findUp('pnpm-workspace.yaml', { cwd }))

const dirStale = join(root, 'dist-stale', `.${base}`)
const dirDist = join(root, 'dist', `.${base}`)

// console.log({
//   cwd,
//   base,
//   args,
//   root,
//   dirStale,
//   dirDist,
// })

if (existsSync(dirStale)) {
  console.log('Stale directory found, copying to dist')
  if (!existsSync(dirDist)) {
    await fs.mkdir(dirname(dirDist), { recursive: true })
  }
  else {
    await fs.rm(dirDist, { recursive: true })
  }
  await fs.cp(dirStale, dirDist, { recursive: true })
}
else {
  console.log('No stale directory found, building')

  const command = ['slidev', 'build', '--base', base, '--out', `../../dist${base}`, ...args]

  console.log('Building', command.join(' '))

  await x('npx', command, {
    nodeOptions: {
      cwd,
      stdio: 'inherit',
    },
  })

  // Slidevの seoMeta.ogImage: auto は og:image を "./og-image.png" の相対パスで出力するが、
  // X/Slack等のクローラーは絶対URLしか解釈しないため本番URLに書き換える
  const indexHtml = join(dirDist, 'index.html')
  const html = await fs.readFile(indexHtml, 'utf-8')
  await fs.writeFile(indexHtml, html.replaceAll('"./og-image.png"', `"https://talks.hol1kgmg.com${base}og-image.png"`), 'utf-8')
}
