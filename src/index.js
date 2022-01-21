import express from 'express';
import posts from "./tweets/posts";

const app = express();
const port = 3000;

app.use(express.json());

app.use('/posts', posts);

app.listen(port, () => {
  console.log(`짜자잔~ >>>> http://localhost:${port}`);
});