import { Router } from 'express'
import auth from './auth'
import posts from './posts'

const api = Router()

api.use(auth)
api.use(posts)

export default api
