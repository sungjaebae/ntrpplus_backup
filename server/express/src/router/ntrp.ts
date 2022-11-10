import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const ntrpRouter = Router()

ntrpRouter.get('/', (req, res) => {
  return res.json({ hello: 'ntrp router' })
})

ntrpRouter.get('/:testId', (req, res, next) => {
  const { testId } = req.params
  return res.json({ 구현할응답: `검사결과 ${testId} 의 세부사항을 반환함` })
})

ntrpRouter.get('/player/:playerId', (req, res, next) => {
  const { playerId } = req.params
  return res.json({ 구현할응답: `플레이어 ${playerId}의 모든 검사결과를 반환함` })
})

ntrpRouter.get('/panel/:panelId', (req, res, next) => {
  const { panelId } = req.params
  return res.json({ 구현할응답: `측정자 ${panelId}가 수행한 모든 검사결과를 반환함` })
})

ntrpRouter.get('/:panelId/:playerId', (req, res, next) => {
  const { panelId, playerId } = req.params
  return res.json({
    구현할응답: ` 측정자 ${panelId}가 수행한 유저 ${playerId}의 모든 검사 결과들을 반환함`,
  })
})

ntrpRouter.post('/', (req, res, next) => {
  return res.json({
    구현할요청: `전화번호, 상대방 전화번호, 질문에 대한 답변, 검사지 버전, 각 부문별 점수, 검사 시작시간, 검사 종료시간`,
    구현할응답: `응답 코드만 던짐`,
  })
})

ntrpRouter.post('/:test', (req, res, next) => {
  return res.json({
    구현할요청: `전화번호`,
    구현할응답: `응답 코드만 던짐`,
  })
})

export default ntrpRouter
