const express = require('express')
const path = require('path')
const morgan = require('morgan')

const { sequelize } = require('./models')

import tweets from './tweets'

const app = express()
app.set('port', process.env.PORT || 3000)

sequelize // 시퀄라이즈 연결
  .sync({ force: false }) // force는 서버 실행시마다 테이블 재생성 여부
  .then(() => {
    console.log('데이터베이스 연결 성공')
  })
  .catch((err) => {
    console.error(err)
  })

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('./tweets', tweets)

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중')
})
