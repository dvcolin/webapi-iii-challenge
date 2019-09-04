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

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;