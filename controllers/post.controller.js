const models = require('../models');

function index (reg, res) {
    const posts = 'These are posts';
    return res.send(posts);
}

function save(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        userId: 1,
        categoryId: 1
    };
    models.Post.create(post).then(result => {
        res.status(201).json({
            message: "Post created successfully",
            post: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

module.exports = {
    index: index,
    save: save
}