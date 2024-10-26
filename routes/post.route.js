const express = require('express')

const postController = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.get('/', postController.index);

module.exports = postRouter;