const express = require('express')

const postController = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.get('/', postController.index);
postRouter.post('/', postController.save);
//postRouter.patch(':id', postController.update);
//postRouter.delete(':id', postController.delete);

module.exports = postRouter;