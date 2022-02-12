import { Router } from 'express'
import user from '../models/user'

const auth = Router()

auth.post('/login', async (req, res) => {
  const users = await user.findOne({ where: { email: req.body.email } })
  if (!users) {
    return res.status(404).json({
      error: {
        message: '로그인 되었습니다',
      },
    })
  }
  if (users.password !== req.body.password) {
    return res.status(401).json({
      error: {
        message: '이메일, 패스워드가 일치하지 않습니다',
      },
    })
  }
  res.json({
    data: {
      users: {
        id: users.id,
      },
    },
  })
})

auth.post('/register', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(409).json({
      error: {
        message: '올바르지 않습니다',
      },
    })
  }

  const { email, password } = req.body

  const exist = await user.findOne({ where: { email } })
  if (exist) {
    return res.status(409).json({
      error: {
        message: '이미 존재하는 이메일입니다',
      },
    })
  }

  const users = await user.create({ email, password })
  res.json({
    data: {
      user: {
        id: users.id,
      },
    },
  })
})

export default auth
