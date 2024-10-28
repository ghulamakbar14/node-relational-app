const express = require("express");
const bodyParser = require('body-parser');

const app = express();

const postRouter = require("./routes/post.route");
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('This is home function');
});

app.use('/posts', postRouter);


module.exports = app