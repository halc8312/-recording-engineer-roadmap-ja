import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const modulePaths = {
  combined: '/.vitepress/theme/data/examQuestions.ts',
  domain12: '/.vitepress/theme/data/questions-domain12.ts',
  domain34: '/.vitepress/theme/data/questions-domain34.ts'
}
const expectedDomains = [1, 2, 3, 4]
const errors = []

function addError(message) {
  errors.push(message)
}

function normalized(value) {
  return value.trim().replace(/\s+/g, ' ')
}

function lessonFile(pathname) {
  const pathWithoutFragment = pathname.split(/[?#]/, 1)[0]
  if (!pathWithoutFragment.startsWith('/') || pathWithoutFragment.includes('..')) return null
  const relativePath = decodeURIComponent(pathWithoutFragment.slice(1))
  const markdownPath = resolve(projectRoot, `${relativePath}.md`)
  const indexPath = resolve(projectRoot, relativePath, 'index.md')
  if (existsSync(markdownPath)) return markdownPath
  if (existsSync(indexPath)) return indexPath
  return null
}

const vite = await createServer({
  root: projectRoot,
  configFile: false,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true }
})

try {
  const [combinedModule, domain12Module, domain34Module] = await Promise.all([
    vite.ssrLoadModule(modulePaths.combined),
    vite.ssrLoadModule(modulePaths.domain12),
    vite.ssrLoadModule(modulePaths.domain34)
  ])
  const questions = combinedModule.examQuestions
  const sourceQuestions = [
    ...domain12Module.questionsDomain12,
    ...domain34Module.questionsDomain34
  ]

  if (!Array.isArray(questions)) {
    addError('examQuestions must export an array.')
  } else {
    if (questions.length !== 160) {
      addError(`Expected 160 questions, found ${questions.length}.`)
    }
    if (sourceQuestions.length !== 160) {
      addError(`Source modules must contain 160 questions, found ${sourceQuestions.length}.`)
    }

    const combinedIds = questions.map((question) => question.id)
    const sourceIds = sourceQuestions.map((question) => question.id)
    if (combinedIds.join('\n') !== sourceIds.join('\n')) {
      addError('examQuestions must combine questionsDomain12 followed by questionsDomain34 without omissions or reordering.')
    }

    const idOwners = new Map()
    const promptOwners = new Map()

    questions.forEach((question, index) => {
      const label = question?.id || `question at index ${index}`
      if (!question || typeof question !== 'object') {
        addError(`Question at index ${index} is not an object.`)
        return
      }
      if (!Number.isInteger(question.domain) || !expectedDomains.includes(question.domain)) {
        addError(`${label}: domain must be 1, 2, 3, or 4.`)
      }
      if (typeof question.id !== 'string' || !/^d[1-4]-\d{3}$/.test(question.id)) {
        addError(`${label}: id must match d1-001 through d4-999.`)
      } else if (idOwners.has(question.id)) {
        addError(`${label}: duplicate id also used at index ${idOwners.get(question.id)}.`)
      } else {
        idOwners.set(question.id, index)
      }
      if (typeof question.topic !== 'string' || normalized(question.topic).length < 2) {
        addError(`${label}: topic must contain at least 2 characters.`)
      }
      if (typeof question.prompt !== 'string' || normalized(question.prompt).length < 12) {
        addError(`${label}: prompt must contain at least 12 characters.`)
      } else {
        const prompt = normalized(question.prompt)
        if (promptOwners.has(prompt)) {
          addError(`${label}: duplicate prompt also used by ${promptOwners.get(prompt)}.`)
        } else {
          promptOwners.set(prompt, label)
        }
      }
      if (!Array.isArray(question.choices) || question.choices.length !== 4) {
        addError(`${label}: choices must contain exactly 4 items.`)
      } else {
        const choices = question.choices.map((choice) =>
          typeof choice === 'string' ? normalized(choice) : ''
        )
        if (choices.some((choice) => choice.length < 1)) {
          addError(`${label}: every choice must be a non-empty string.`)
        }
        if (new Set(choices).size !== 4) {
          addError(`${label}: all 4 choices must be unique after whitespace normalization.`)
        }
      }
      if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) {
        addError(`${label}: correctIndex must be an integer from 0 to 3.`)
      }
      if (typeof question.explanation !== 'string' || normalized(question.explanation).length < 40) {
        addError(`${label}: explanation must contain at least 40 characters.`)
      }
      if (typeof question.lesson !== 'string' || !lessonFile(question.lesson)) {
        addError(`${label}: lesson does not resolve to a local Markdown page (${question.lesson ?? 'missing'}).`)
      }
    })

    for (const domain of expectedDomains) {
      const domainQuestions = questions.filter((question) => question.domain === domain)
      if (domainQuestions.length !== 40) {
        addError(`Domain ${domain}: expected 40 questions, found ${domainQuestions.length}.`)
      }
      for (let correctIndex = 0; correctIndex < 4; correctIndex += 1) {
        const count = domainQuestions.filter(
          (question) => question.correctIndex === correctIndex
        ).length
        if (count !== 10) {
          addError(`Domain ${domain}, correctIndex ${correctIndex}: expected 10, found ${count}.`)
        }
      }
    }
  }
} finally {
  await vite.close()
}

if (errors.length > 0) {
  console.error(`Question bank validation failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log('Question bank OK: 160 total; 40 per domain; correctIndex 0-3 each appear 10 times per domain.')
}
