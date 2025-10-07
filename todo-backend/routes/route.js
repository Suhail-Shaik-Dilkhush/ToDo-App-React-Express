const { home, getTodo, postTodo, deleteTodo } = require('../controllers/TodoController');
const express = require('express');
const router = express.Router()


router.get('/', home);

router.get('/data', getTodo);

router.post('/data', postTodo)

router.delete('/data/:id', deleteTodo)

module.exports = router;