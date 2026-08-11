import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { execa } from 'execa'
import ora from 'ora'
import prompts from 'prompts'

async function addImage(args: string[]) {
  const [imagePath] = args
  if (!imagePath) {
    console.error('Usage: mise run image <path-to-image>')
    process.exitCode = 1
    return
  }

  const sourcePath = path.resolve(process.cwd(), imagePath)
  await fs.access(sourcePath)

  const folders = (await fs.readdir(new URL('..', import.meta.url), { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(folder => folder.match(/^\d{4}-/))
    .sort((a, b) => -a.localeCompare(b))
    .map(folder => ({ title: folder, value: folder }))

  const { folder } = await prompts([
    {
      type: 'select',
      name: 'folder',
      message: 'Pick a slide folder',
      choices: folders,
    },
  ])
  if (!folder)
    return

  const imagesDir = new URL(`../${folder}/src/public/images/`, import.meta.url)
  await fs.mkdir(imagesDir, { recursive: true })

  const { name, ext } = path.parse(sourcePath)

  // svgはラスタライズすると劣化するため変換せずそのままコピーする
  // webpは既に目的のフォーマットのため、再変換による劣化を避けるためコピーする
  const lowerExt = ext.toLowerCase()
  if (lowerExt === '.svg' || lowerExt === '.webp') {
    const outputPath = path.join(new URL(imagesDir).pathname, `${name}${lowerExt}`)
    const relativeOutputPath = path.relative(process.cwd(), outputPath)
    const spinner = ora(`Copying to ${relativeOutputPath}`).start()

    try {
      await fs.copyFile(sourcePath, outputPath)
      spinner.succeed(`Saved ${relativeOutputPath}`)
    }
    catch (error) {
      spinner.fail(`Failed to copy ${relativeOutputPath}`)
      throw error
    }
    return
  }

  const outputPath = path.join(new URL(imagesDir).pathname, `${name}.webp`)

  const relativeOutputPath = path.relative(process.cwd(), outputPath)
  const spinner = ora(`Converting to ${relativeOutputPath}`).start()

  try {
    // quality 90: 写真の軽量化とスクリーンショットの文字の可読性を両立するバランス値
    await execa('ffmpeg', ['-y', '-i', sourcePath, '-quality', '90', outputPath])
    spinner.succeed(`Saved ${relativeOutputPath}`)
  }
  catch (error) {
    spinner.fail(`Failed to convert ${relativeOutputPath}`)
    if (error instanceof Error && 'stderr' in error)
      console.error(error.stderr)
    throw error
  }
}

await addImage(process.argv.slice(2))
