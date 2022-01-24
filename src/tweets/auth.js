import { Router } from 'express'

const auth = Router()

let nextId = 4

let users = [
  {
    id: 1,
    email: '111@gmail.com',
    password: '111pass',
  },
  {
    id: 2,
    email: '222@gmail.com',
    password: '222pass',
  },
  {
    id: 3,
    email: '333@gmail.com',
    password: '333pass',
  },
]

auth.get('/', (req, res) => {
  res.json(users) //users 형식의 응답을 보낸다.
}) //전체 회원 조회

auth.get("/:id", (req, res) => {
  const index = users.findIndex(user => user.id === +req.params.id);
  //findIndex 함수는 파라미터로 함수를 입력받아 특정 조건을 확인한 후 조건을 만족하면 만족하는 원소가 몇 번째인지 알려준다.
  if (index === -1) {
    return res.json({
      error: "없는 트윗입니당당구리", //없는 글일 경우
    });
  }
  res.json(users.filter(user => user.id === +req.params.id)[0]); //user 중에서 조건에 맞는 순서의 원소를 응답으로 보내는 듯
});

auth.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const Emailcheck = users.findIndex((user) => user.email === +req.params.email)
  const Passwordcheck = users.findIndex(
    (user) => user.password === +req.params.password,
  )

  if (Emailcheck && Passwordcheck) {
    res.json(users.filter((user) => user.id === +req.params.id)[0])
  } else {
    return res.json({
      error: '아이디, 패스워드가 일치하지 않습니다.',
    })
  }
}) //일단 아이디, 패스워드 치면 id값 나오게끔

auth.post('/register', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (users.findIndex((post) => users.email === +req.params.email)) {
    return res.json({
      error: '이미 존재하는 이메일입니다.',
    })
  }

  users.push({
    id: nextId++,
    email: req.body.email,
    password: req.body.password,
  })
  res.json(users)
})

export default auth
