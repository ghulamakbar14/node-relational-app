const express = require("express");
const app = express();

const postRouter = require("./routes/post.route");

app.use('/posts', postRouter);


module.exports = app