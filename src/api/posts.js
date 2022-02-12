import { Router } from 'express'
import checkLoggedIn from '../../middlewares/checkLoggedIn'
import post from '../models/post'

const route = Router()

route.get('/', async (req, res) => {
  const posts = await post.findAll()
  res.status(200).json(posts)
})

route.get('/:id', async (req, res) => {
  const index = await post.findOne({ where: { id: req.params.id } })
  if (!index) {
    return res.status(404).json({
      error: '없는 트윗입니당', //없는 글일 경우
    })
  }
  res.json({ data: post })
})
//글 개별 목록 조회

route.post('/', (req, res) => {
  posts.push({
    id: nextId++, //id를 nextId로, nextId에는 1 추가한다는 뜻
    content: req.body.content,
    writer: req.body.writer,
  })
  res.json(posts)
})

route.put('/:id', checkLoggedIn, async (req, res) => {
  const index = await post.findOne({ where: { id: req.params.id } })

  if (index.writer !== req.header('x-user-id')) {
    return res.json({
      error: { message: 'That post does not exist' },
    })
  }

  await index.update({ content: req.body.content })
  await index.save()

  res.json({
    data: {
      id: req.params.id,
    },
  })
})

route.delete('/:id', checkLoggedIn, async (req, res) => {
  const index = await post.findOne({ where: { id: req.params.id } })
  if (index.writer !== req.header('x-user-id')) {
    return res.json({
      error: { message: '게시물이 존재하지 않습니다' },
    })
  }

  await index.destroy()
  res.json({
    data: {
      message: '성공적으로 삭제됨',
    },
  })
})

export default route
