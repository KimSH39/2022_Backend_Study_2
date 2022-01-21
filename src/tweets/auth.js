import { Router } from "express";

const route = Router();

let nextId = 4;

let user = [
    {
        id: 1,
        email: '111@gmail.com',
        password: '111pass'
    },
    {
        id: 2,
        email: '222@gmail.com',
        password: '222pass'
    },
    {
        id: 3,
        email: '333@gmail.com',
        password: '333pass'
    },
]