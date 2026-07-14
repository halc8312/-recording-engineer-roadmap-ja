import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootPath = fileURLToPath(new URL('../.vitepress/dist/', import.meta.url))
const repository = process.env.GITHUB_REPOSITORY
const [owner, repositoryName] = repository?.split('/') ?? []
const isUserSite = repositoryName === `${owner}.github.io`
const base =
  process.env.GITHUB_ACTIONS === 'true' && repositoryName && !isUserSite
    ? `/${repositoryName}/`
    : '/'

if (!existsSync(rootPath)) {
  throw new Error('Build output not found. Run npm run docs:build first.')
}

function filesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? filesUnder(path) : [path]
  })
}

const files = filesUnder(rootPath)
const htmlFiles = files.filter((file) => file.endsWith('.html'))
const errors = []
let checkedLinks = 0

function anchorExists(file, encodedAnchor) {
  if (!encodedAnchor) return true
  const anchor = decodeURIComponent(encodedAnchor)
  const html = readFileSync(file, 'utf8')
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]))
  return ids.has(anchor)
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const links = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1])

  for (const originalLink of links) {
    if (
      originalLink.startsWith('http://') ||
      originalLink.startsWith('https://') ||
      originalLink.startsWith('mailto:') ||
      originalLink.startsWith('tel:') ||
      originalLink.startsWith('data:')
    ) {
      continue
    }

    if (originalLink.startsWith('#')) {
      checkedLinks += 1
      if (!anchorExists(file, originalLink.slice(1))) {
        errors.push(`${relative(rootPath, file)}: anchor not found for ${originalLink}`)
      }
      continue
    }

    const [pathAndQuery, encodedAnchor = ''] = originalLink.split('#', 2)
    let link = pathAndQuery.split('?')[0]
    if (!link) continue
    checkedLinks += 1

    if (link.startsWith('/')) {
      if (base !== '/' && !link.startsWith(base)) {
        errors.push(`${relative(rootPath, file)}: base path missing in ${originalLink}`)
        continue
      }
      link = base === '/' ? link.slice(1) : link.slice(base.length)
    } else {
      const currentDirectory = dirname(relative(rootPath, file))
      link = join(currentDirectory, link)
    }

    link = decodeURIComponent(link)
    const candidates = link === ''
      ? ['index.html']
      : link.endsWith('/')
        ? [`${link}index.html`]
        : extname(link)
          ? [link]
          : [`${link}.html`, `${link}/index.html`]

    const target = candidates.find((candidate) => existsSync(join(rootPath, candidate)))
    if (!target) {
      errors.push(`${relative(rootPath, file)}: target not found for ${originalLink}`)
    } else if (encodedAnchor && target.endsWith('.html') && !anchorExists(join(rootPath, target), encodedAnchor)) {
      errors.push(`${relative(rootPath, file)}: anchor not found for ${originalLink}`)
    }
  }
}

const requiredFiles = [
  'index.html',
  'progress.html',
  'ROADMAP.html',
  'practice/cubase-labs.html',
  'practice/mock-exam.html',
  'downloads/progress.csv',
  'logo.svg',
  '404.html'
]

for (const file of requiredFiles) {
  if (!existsSync(join(rootPath, file))) errors.push(`required output missing: ${file}`)
}

const css = files.filter((file) => file.endsWith('.css')).map((file) => readFileSync(file, 'utf8')).join('\n')
if (/url\(["']?https?:\/\//.test(css)) {
  errors.push('external stylesheet resource detected; the learning site should stay self-contained')
}

if (errors.length) {
  console.error(`Site check failed with ${errors.length} error(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Site check passed: ${htmlFiles.length} pages and ${checkedLinks} internal assets/links verified.`)
