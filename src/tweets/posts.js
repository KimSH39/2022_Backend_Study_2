import { Router } from "express";

const route = Router();

let nextId = 4; //이게 뭐지?

let posts = [
  {
    id: 1,
    content: '안녕하신가요?',
    writer: 1
  },
  {
    id: 2,
    content: '저는 안녕하지 않습니다',
    writer: 2
  },
  {
    id: 3,
    content: '퇴근까지 일곱 시간',
    writer: 3
  },
];

route.get("/", (req, res) => {
  res.json(posts); //posts 형식의 응답을 보낸다.
});

route.get("/:id", (req, res) => {
  const index = posts.findIndex(post => post.id === +req.params.id);
  //findIndex 함수는 파라미터로 함수를 입력받아 특정 조건을 확인한 후 조건을 만족하면 만족하는 원소가 몇 번째인지 알려준다.
  if (index === -1) {
    return res.json({
      error: "없는 트윗입니당당구리", //없는 글일 경우
    });
  }
  res.json(posts.filter(post => post.id === +req.params.id)[0]); //post 중에서 조건에 맞는 순서의 원소를 응답으로 보내는 듯
});

//글 개별 목록 조회, 이거 글 수정 후에는 개별 조회 하면 에러 뜸 왜 이러지?

route.post("/", (req, res) => {
  posts.push({
    id: nextId++, //배열에 추가하겠다는?
    content: req.body.content, //req.body -> POST 정보를 가진다, body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체
    writer: req.body.writer //뭔가 되기는 했는데 이거 뭔지 잘 모르겠음
  });
  res.json(posts);
});

//글을 집어넣는다, 이미 있는 id값으로 보내면 가장 마지막 번호+1로 새로 만들어짐, 삭제 후에도 이러네...? 일단 auth 후에 생각해 보자

route.put('/:id', (req, res) => {
  const index = posts.findIndex(post => post.id === +req.params.id);
  if (index === -1) {
    return res.json({
      error: "That post does not exist",
    });
  }

  posts[index] = {
    id: req.params.id,
    content: req.body.content,
    writer: req.body.writer
  };
  res.json(posts);
});

//수정, 근데 수정 후 한 번 더 수정하는 게 안 되네?

route.delete('/:id', (req, res) => {
  const index = posts.findIndex(post => post.id === +req.params.id);
  if (index === -1) {
    return res.json({
      error: "That post does not exist",
    });
  }

  posts = posts.filter(post => post.id !== +req.params.id);
  res.json(posts);
});

export default route;
