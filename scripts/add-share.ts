import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { execa } from 'execa'
import ora from 'ora'

async function addShare(args: string[]) {
  const [imagePath] = args
  if (!imagePath) {
    console.error('Usage: mise run share <path-to-image>')
    process.exitCode = 1
    return
  }

  const sourcePath = path.resolve(process.cwd(), imagePath)
  await fs.access(sourcePath)

  const imagesDir = new URL('../reuse/images/', import.meta.url)
  await fs.mkdir(imagesDir, { recursive: true })

  const { name, ext } = path.parse(sourcePath)

  // svgはラスタライズすると劣化するため変換せずそのままコピーする
  if (ext.toLowerCase() === '.svg') {
    const outputPath = path.join(new URL(imagesDir).pathname, `${name}.svg`)
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

await addShare(process.argv.slice(2))
