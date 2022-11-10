import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import ntrpRouter from './router/ntrp'

dotenv.config()
const port = process.env.port || 4000

const app = express()

app.get('/api', (req, res, next) => {
  res.json({
    hello: '잘 동작중',
  })
})

app.use('/api/ntrp', ntrpRouter)

app.listen(port, async () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${port}
  ################################################
`)
})
