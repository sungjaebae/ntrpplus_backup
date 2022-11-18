import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import type { ErrorRequestHandler } from 'express'

const prisma = new PrismaClient()
const ntrpRouter = Router()

ntrpRouter.get('/', (req, res) => {
  return res.json({ hello: 'ntrp router' })
})
//플레이어 생성
ntrpRouter.post('/player', async (req, res, next) => {
  try {
    let { age, gender, tennisHistory, phoneNumber, nickname } = req.body
    let last4digits;
    if(phoneNumber)
    {
      last4digits = phoneNumber.slice(-4, phoneNumber.length) 
    }
    if(!nickname&& !last4digits)
    {
      nickname=last4digits
    }
    const user = await prisma.user.create({
      data: { age, gender, tennisHistory, phoneNumber, nickname},
    })
    //console.log('create player ', user)
    return res.json(user)
  } catch (err) {
    next(err)
  }
})

//플레이어 업데이트
ntrpRouter.put('/player/:playerId', async (req, res, next) => {
  try {
    const { playerId } = req.params
    const { age, gender, tennisHistory, phoneNumber } = req.body
    const user = await prisma.user.update({
      where: {
        id: playerId,
      },
      data: { age, gender, tennisHistory, phoneNumber },
    })
    //console.log('updated player ', user)
    return res.json(user)
  } catch (err) {
    next(err)
  }
})

//플레이어 전화번호로 조회
ntrpRouter.get('/player/:phoneNumber', async (req, res, next) => {
  try {
    const { phoneNumber } = req.params
    const user = await prisma.user.findFirst({
      where: { phoneNumber },
    })
    //console.log('player by phoneNumber ', user)
    return res.json(user)
  } catch (err) {
    next(err)
  }
})

//패널 생성, 사실상 플레이어생성과 동일함
ntrpRouter.post('/panel', async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {},
    })
    //console.log('create panel ', user)
    return res.json(user)
  } catch (err) {
    next(err)
  }
})

//테스트 생성
ntrpRouter.post('/test', async (req, res, next) => {
  try {
    const { playerId, panelId } = req.body
    const testResult = await prisma.testResult.create({
      data: { playerId, panelId },
      include: {
        player: true,
        panel: true,
      },
    })
    //console.log('create test', testResult)
    return res.json(testResult)
  } catch (err) {
    next(err)
  }
})

//테스트 업데이트
ntrpRouter.put('/test/:testId', async (req, res, next) => {
  try {
    const { testId } = req.params
    const { answers, version, forehandScore, backhandScore, serveAndReturnScore, volleyScore } =
      req.body
    const testResult = await prisma.testResult.update({
      where: { id: testId },
      data: {
        answers,
        version,
        forehandScore,
        backhandScore,
        serveAndReturnScore,
        volleyScore,
      },
      include: {
        player: true,
        panel: true,
      },
    })
    //console.log('update test', testResult)
    return res.json(testResult)
  } catch (err) {
    next(err)
  }
})

//플레이어의 모든 테스트 결과 조회
ntrpRouter.get('/test/player/:playerId', async (req, res, next) => {
  try {
    const { playerId } = req.params
    const testResult = await prisma.testResult.findMany({
      where: { playerId },
      include: {
        player: true,
        panel: true,
      },
    })
    //console.log("get player's tests", testResult)
    return res.json(testResult)
  } catch (err) {
    next(err)
  }
})

//패널의 모든 테스트 결과 조회
ntrpRouter.get('/test/panel/:panelId', async (req, res, next) => {
  try {
    const { panelId } = req.params
    const testResult = await prisma.testResult.findMany({
      where: { panelId },
      include: {
        player: true,
        panel: true,
      },
    })
    //console.log("get panel's tests", testResult)
    return res.json(testResult)
  } catch (err) {
    next(err)
  }
})

//플레이어 패널 페어의 모든 테스트 결과 조회
ntrpRouter.get('/test/:panelId/:playerId', async (req, res, next) => {
  try {
    const { panelId, playerId } = req.params
    const testResult = await prisma.testResult.findMany({
      where: { panelId, playerId },
      include: {
        player: true,
        panel: true,
      },
    })
    //console.log("get panel and player pair's tests", testResult)
    return res.json(testResult)
  } catch (err) {
    next(err)
  }
})

//테스트 검사결과 조회
ntrpRouter.get('/test/:testId', async (req, res, next) => {
  try {
    const { testId } = req.params
    const testResult = await prisma.testResult.findMany({
      where: { id: testId },
      include: {
        player: true,
        panel: true,
      },
    })
    //console.log('get a test result ', testResult)
    return res.json(testResult)
  } catch (err) {
    next(err)
  }
})

function jsonFriendlyErrorReplacer(key: any, value: any) {
  if (value instanceof Error) {
    return {
      // Pull all enumerable properties, supporting properties on custom Errors
      ...value,
      // Explicitly pull Error's non-enumerable properties
      name: value.name,
      message: value.message,
      stack: value.stack,
    }
  }

  return value
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)
  res.status(401)
  res.json({ error: err.message })
}

ntrpRouter.use(errorHandler)

export default ntrpRouter
