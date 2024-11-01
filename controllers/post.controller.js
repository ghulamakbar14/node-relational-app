const validator = require('fastest-validator');

const models = require("../models");

function index (reg, res) {
    models.Post.findAll().then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(404).json(error)
    })
}

function show(req, res) {
    const id = req.params.id;
    const post = models.Post.findByPk(id).then(result => {
        if(result) {
            res.status(200).json({
                message: "Post found successfully",
                post: result
            });
        } else {
            res.status(404).json({
                message: "Post not found"
            });
        }
    }).catch(error => {
        res.status(404).json({
            message: "Post not found",
            error: error
        })
    })
}

function update(req, res) {
    const id = req.params.id;
    const userId = 1;
    const updatePost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId
    };

    const v = new validator();
    const schema = {
        title: {type: "string", max: "100", optional: false},
        content: {type: "string", max: "500", optional: false},
        categoryId: {type: "number", optional: false},
        imageUrl: {type: "string", optional: true},
    };
    const validatedData = v.validate(updatePost, schema);
    if(validatedData !== true) {
        return res.status(400).json({
            message: "Invalid data sent",
            error: validatedData
        })
    }

    models.Post.update(updatePost, {where: {id:id, userId: userId} }).then(result => {
        if(result) {
            res.status(200).json({
                message: "Post updated successfully",
                post: updatePost
            });
        } else {
            res.status(404).json({
                message: "Post not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    });
}

function save(req, res) {
    const v = new validator();

    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        userId: 1,
        categoryId: 1
    };

    const schema = {
        title: {type: "string", max: "100", optional: false},
        content: {type: "string", max: "500", optional: false},
        categoryId: {type: "number", optional: false},
        imageUrl: {type: "string", optional: true},
    };

    const validatedData = v.validate(post, schema);
    if(validatedData !== true) {
        return res.status(400).json({
            message: "Invalid data sent",
            error: validatedData
        })
    }

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

function destroy(req, res) {
    const id = req.params.id;
    const userId = 1;
    models.Post.destroy({where: {id:id, userId: userId} }).then(result => {
        if (result) {
            res.status(200).json({
                message: "Post deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Post not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    });
}

module.exports = {
    index: index,
    save: save,
    show: show,
    update: update,
    destroy: destroy
}