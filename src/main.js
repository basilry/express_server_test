// @ts-check

const express = require('express')
const bodyParser = require('body-parser')
const userRouter = express.Router()

const app = express()
app.use(express.json())
app.use(express.static('src/public'))
app.set('views', 'src/views')
app.set('view engine', 'pug')

const PORT = 5000

userRouter.get('/', (req, res) => {
  res.send('user list')
})

const USERS = {
  15: {
    nickname: 'foo',
  },
  16: {
    nickname: 'bar',
  },
}

userRouter.param('id', (req, res, next, value) => {
  console.log('id parameter', value)
  // @ts-ignore
  req.user = USERS[value]
  next()
})

userRouter.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    // @ts-ignore
    res.render('user-profile', {
      Nickname: req.user.nickname,
    })
  }

  // console.log('User info with ID')
  // // @ts-ignore
  // res.send(req.user)
})

userRouter.post('/', (req, res) => {
  // Register user
  res.send('User registered.')
})

userRouter.post('/:id/nickname', (req, res) => {
  // req.body: {"nickname": "bar"}
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`user nickname updated ${nickname}`)
})

app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Hello, Pug!!!',
  })
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
