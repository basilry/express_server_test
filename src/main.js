// @ts-check

const express = require('express')
const fs = require('fs')

const app = express()

const PORT = 5000

app.use('/', async (req, res, next) => {
  const requestedAt = new Date()

  const fileContent = await fs.promises.readFile('.gitignore')

  console.log('Middleware 1')
  // @ts-ignore
  req.requestedAt = requestedAt
  // @ts-ignore
  req.fileContent = fileContent
  next()
})

/* 수많은 미들웨어들.. */

app.use((req, res) => {
  console.log('Middleware 2')
  // @ts-ignore
  res.send(`Requested at ${req.requestedAt}, ${req.fileContent}`)
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
