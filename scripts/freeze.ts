import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'

// Freezes a finished talk's build output into dist-stale/, so that future
// `pnpm run build` runs skip rebuilding it (see scripts/build.ts) and just
// copy the frozen output instead. Only run this for talks that are done
// being edited — freezing an actively-changing talk hides new edits from
// future builds until it's unfrozen (remove its dist-stale/<base> dir).
const targets = process.argv.slice(2)

if (targets.length === 0) {
  console.error('Usage: pnpm run freeze <talk-dir> [<talk-dir> ...]')
  console.error('Example: pnpm run freeze 2026-08-10')
  process.exit(1)
}

const packageFiles = (await fg('*/src/package.json', {
  onlyFiles: true,
})).sort()

for (const target of targets) {
  const file = packageFiles.find(f => dirname(dirname(f)) === target)
  if (!file) {
    console.error(`No slide package found for "${target}"`)
    process.exit(1)
  }

  const json = JSON.parse(await fs.readFile(file, 'utf-8'))
  const command = json.scripts?.build
  const base = command?.match(/ (\S*)$/)?.[1]
  if (!base) {
    console.error(`Could not determine build base for "${target}"`)
    process.exit(1)
  }

  const distDir = resolve('dist', `.${base}`)
  const staleDir = resolve('dist-stale', `.${base}`)

  if (!existsSync(distDir)) {
    console.error(`No build output found at ${distDir}. Run "pnpm run build" first.`)
    process.exit(1)
  }

  await fs.rm(staleDir, { recursive: true, force: true })
  await fs.mkdir(dirname(staleDir), { recursive: true })
  await fs.cp(distDir, staleDir, { recursive: true })
  console.log(`Froze ${target} -> dist-stale${base}`)
}
