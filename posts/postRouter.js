const express = require('express');

const router = express.Router();

const PostDb = require('./postDb.js');

router.get('/', (req, res) => {
    PostDb.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: 'Posts could not be accessed.' });
    })
});

router.get('/:id', validatePostId, (req, res) => {
    const post = req.post;

    PostDb.getById(post.id)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({ error: 'Error accessing post data' });
    })
});

router.delete('/:id', validatePostId, (req, res) => {
    const post = req.post;

    PostDb.remove(post.id)
    .then(deleted => {
        res.status(200).json(deleted)
    })
    .catch(err => {
        res.status(500).json({ error: 'Error removing post' });
    })
});

router.put('/:id', validatePostId, (req, res) => {
    const post = req.post;
    const changes = req.body;

    if (!changes.text) {
        res.status(400).json({ message: "missing required text field" });
    } else {
        PostDb.update(post.id, changes)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => {
            res.status(500).json({ error: 'Post data could not be updated' });
        })
    }

});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id;

    PostDb.getById(id)
    .then(post => {
        if (post) {
            req.post = post;

            next();
        } else {
            res.status(404).json({ message: 'Can not find a post with that ID' })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'Post data could not be accessed' });
    })
};

module.exports = router;