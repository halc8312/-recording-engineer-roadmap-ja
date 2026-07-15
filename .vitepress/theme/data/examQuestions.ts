import { questionsDomain12 } from './questions-domain12'
import { questionsDomain34 } from './questions-domain34'

export type ExamDomain = 1 | 2 | 3 | 4

export type ExamQuestion = {
  id: string
  domain: ExamDomain
  topic: string
  prompt: string
  choices: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  explanation: string
  lesson: string
}

export const domainLabels: Record<ExamDomain, string> = {
  1: 'I 音響の理論',
  2: 'II 電気音響とスタジオシステム',
  3: 'III レコーディング技術と先進技術',
  4: 'IV 音楽・音楽著作権・音楽録音の流れ・録音史'
}

// 問題はすべて本サイト独自です。JAPRS公式問題・公式教材の転載ではありません。
// 執筆単位と本試験の4分野は一部が交差するため、最終問題bankで公式分野へ再配分します。
const domainOverrides: Record<string, ExamDomain> = {
  ...Object.fromEntries([
    'd1-012', 'd1-013', 'd1-014', 'd1-015', 'd1-016', 'd1-017',
    'd1-018', 'd1-019', 'd1-020', 'd1-034', 'd1-035', 'd1-036',
    'd1-037', 'd1-038', 'd1-039', 'd1-040'
  ].map((id) => [id, 2 as ExamDomain])),
  ...Object.fromEntries([
    'd2-001', 'd2-002', 'd2-003', 'd2-004', 'd2-005', 'd2-006',
    'd2-007', 'd2-008', 'd2-009', 'd2-010', 'd2-011', 'd2-012',
    'd2-017', 'd2-018', 'd2-019', 'd2-020'
  ].map((id) => [id, 1 as ExamDomain]))
}

const questionsDomain12ByOfficialDomain = questionsDomain12.map((question) => ({
  ...question,
  domain: domainOverrides[question.id] ?? question.domain
}))

export const examQuestions: ExamQuestion[] = [
  ...questionsDomain12ByOfficialDomain,
  ...questionsDomain34
]
